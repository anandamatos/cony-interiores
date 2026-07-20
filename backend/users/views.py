from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Costureira, Servico, Cliente, Produto
from .serializers import CostureiraSerializer, ServicoSerializer, ClienteSerializer, ProdutoSerializer
import time
from datetime import date, timedelta
from collections import defaultdict
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.utils import timezone


# ==================== VIEWS DE TESTE ====================

@api_view(['GET'])
@permission_classes([AllowAny])
def hello(request):
    return Response({"message": "Hello Cony Interiores!"})


@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"message": "Bem-vindo ao backend Cony Interiores!"})


# ==================== VIEWSET DA COSTUREIRA ====================

class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()
    serializer_class = CostureiraSerializer
    permission_classes = [AllowAny]

    # NOTA --- O dispatch abaixo serve apenas para calcular o tempo de resposta.
    # Pode ser removido.

    def dispatch(self, request, *args, **kwargs):
        inicio = time.perf_counter()
        response = super().dispatch(request, *args, **kwargs)
        fim = time.perf_counter()
        tempo_gasto = fim - inicio
        action = getattr(self, 'action', request.method)

        print(f"KPI - Ação [{action}] levou {tempo_gasto:.4f} segundos.")
        if action == 'destroy':
            print(f"Um registro foi deletado e o processo levou {tempo_gasto:.4f}s.")
        elif action in ['update', 'partial_update']:
            print(f"Um registro foi atualizado e o processo levou {tempo_gasto:.4f}s.")
        return response


# ==================== VIEWSET DO SERVIÇO ====================

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['cliente', 'costureira', 'data_envio', 'prazo_entrega']
    search_fields = ['cliente__nome', 'observacoes']
    ordering_fields = ['data_envio', 'prazo_entrega', 'valor', 'complexidade']


# ==================== VIEWSET DO CLIENTE ====================

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]


# ==================== VIEWSET DO PRODUTO ====================

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]

# ==================== VIEWSET DA METRICA DE PRODUÇÃO =========

class MetricaViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    @action(detail=False, methods=["get"], url_path="otif") #/metricas/test_otif/

    def OTIF(self, request):
        servicos = Servico.objects.all()
        hoje = date.today()
        OTIF_lista = []

        for servico in servicos:
            nome_costureira = getattr(servico.costureira, "nome", "Sem nome")
            if servico.data_envio and servico.prazo_entrega:
                if servico.data_envio >= servico.prazo_entrega:
                    atraso = (hoje - servico.prazo_entrega).days
                    mensagem = (f"Atrasado: enviado {atraso} dias após o prazo.")
                    status = "Atrasado"
                else:
                    mensagem = "Pedido dentro do prazo de entrega."
                    status = "No prazo"
            else:
                mensagem = "Dados de envio ou prazo ausentes."
                status = "Indefinido"
            OTIF_lista.append(
                {
                    "costureira": nome_costureira,
                    "status": status,
                    "detalhe": mensagem,
                    "prazo": servico.prazo_entrega,
                    "data_envio": servico.data_envio,
                }
            )
        return Response(
            {"total_pedidos": len(OTIF_lista), "Cycle": OTIF_lista}
        )
    

    
    def _contar_dias_uteis_padrao(self, inicio, fim):
        dias_uteis = 0
        dia_atual = inicio
        while dia_atual < fim:
            if dia_atual.weekday() < 5:
                dias_uteis += 1
            dia_atual += timedelta(days=1)
        return dias_uteis

    @action(detail=False, methods=["get"], url_path="cycle-time")
    def cycle_time(self, request):
        servicos = Servico.objects.all()
        Cycle = []
        tempos_por_mes = defaultdict(list)
        for servico in servicos:
            nome_costureira = getattr(servico.costureira, "nome", "Sem nome")
            capacidade_costureira = int(getattr(servico.costureira, "capacidade_base_semanal", 5))
            inicio = servico.criacao
            fim = servico.data_envio
            if inicio and fim:
                d_inicio = inicio.date() if hasattr(inicio, "date") else inicio
                d_fim = fim.date() if hasattr(fim, "date") else fim
                cycle_week = self._contar_dias_uteis_padrao(d_inicio, d_fim)
                cycle_time_final = round(cycle_week * (capacidade_costureira / 5))
                mes_ano = d_inicio.strftime("%Y-%m")
                tempos_por_mes[mes_ano].append(cycle_time_final)
            else:
                cycle_time_final = None
            Cycle.append(
                {
                    "costureira": nome_costureira,
                    "capacidade_semanal": capacidade_costureira,
                    "cycle_time_dias_uteis": cycle_time_final,
                }
            )
        resumo_mensal = []
        for mes, lista_tempos in tempos_por_mes.items():
            if lista_tempos:
                media_mes = round(sum(lista_tempos) / len(lista_tempos), 1)
                resumo_mensal.append(
                    {
                    "mes": mes,
                    "total_servicos_concluidos": len(lista_tempos),
                    "media_cycle_time_dias": media_mes,
                    }
                )
        return Response(
        {
            "total_registros": len(Cycle),
            "resumo_por_periodo": resumo_mensal, 
            "dias trabalhados": Cycle,
        }
    )

    

    @action(detail=False, methods=["get"], url_path="produtividade-mensal")
    def produtividade_mensal(self, request):
        produtividade = (
            Servico.objects.annotate(mes=TruncMonth("criacao"))
            .values("mes")
            .annotate(total_servicos=Count("id"))
            .order_by("-mes")
        )

        return Response(produtividade)
    
    @action(detail=False, methods=["get"], url_path="inatividade")
    def inatividade(self, request):
        servicos = Servico.objects.select_related("costureira").all()
        hoje = timezone.now().date()
        ultimos_envios = {}

        for servico in servicos:
            nome_costureira = getattr(servico.costureira, "nome", "Sem Nome")
            if servico.data_envio:
                data_envio = (servico.data_envio.date() 
                    if hasattr(servico.data_envio, "date")
                    else servico.data_envio)
                if (nome_costureira not in ultimos_envios
                    or data_envio > ultimos_envios[nome_costureira]):
                    ultimos_envios[nome_costureira] = data_envio
        relatorio = []
        for costureira, ultima_data in ultimos_envios.items():
            dias_inativa = (hoje - ultima_data).days

            if dias_inativa > 15:
                status = "Alerta: Inatividade Alta"
            elif dias_inativa > 7:
                status = "Atencao: Inatividade Media"
            else:
                status = "Ativa"

            relatorio.append(
                {
                    "costureira": costureira,
                    "ultimo_envio": ultima_data,
                    "dias_inativa": dias_inativa,
                    "status": status,
                }
            )
        return Response(
            {
                "data_consulta": hoje,
                "total_costureiras_analisadas": len(relatorio),
                "relatorio_inatividade": relatorio,
            }
        )

    @action(detail=False, methods=["get"], url_path="eficiencia")
    def eficiencia(self, request):
        servicos = Servico.objects.all()
        hoje = timezone.now()
        mes_atual_str = hoje.strftime("%Y-%m")
        total_mes = 0
        no_prazo_mes = 0
        for servico in servicos:
            if servico.criacao:
                mes_servico = servico.criacao.strftime("%Y-%m")
                if mes_servico == mes_atual_str:
                    total_mes += 1
                    if servico.data_envio and servico.prazo_entrega:
                        d_envio = (servico.data_envio.date()
                            if hasattr(servico.data_envio, "date")
                            else servico.data_envio)
                        d_prazo = (servico.prazo_entrega.date()
                            if hasattr(servico.prazo_entrega, "date")
                            else servico.prazo_entrega)

                        if d_envio <= d_prazo:
                            no_prazo_mes += 1
        if total_mes > 0:
            taxa_eficiencia = round((no_prazo_mes / total_mes) * 100, 2)
        else:
            taxa_eficiencia = 0.0

        return Response(
            {
                "mes_referencia": mes_atual_str,
                "total_pedidos_mes": total_mes,
                "entregas_no_prazo": no_prazo_mes,
                "taxa_eficiencia_porcentagem": f"{taxa_eficiencia}%",
            }
        )
  