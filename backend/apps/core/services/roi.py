from datetime import date, timedelta
from django.db.models import Sum
from users.models import Costureira, Servico

PERIODO_DIAS = 30
SEMANAS_NO_PERIODO = PERIODO_DIAS / 7


def calcular_cards_roi():
    hoje = date.today()
    inicio_periodo = hoje - timedelta(days=PERIODO_DIAS)

    cards = []
    costureiras = Costureira.objects.filter(ativo=True)

    for costureira in costureiras:
        servicos_periodo = Servico.objects.filter(
            costureira=costureira,
            data_envio__gte=inicio_periodo,
        )

        receita_gerada = servicos_periodo.aggregate(total=Sum("valor"))["total"] or 0
        pecas_produzidas = servicos_periodo.aggregate(total=Sum("quantidade"))["total"] or 0
        total_servicos = servicos_periodo.count()

        ultimo_relatorio = costureira.relatorios.order_by("-id").first()
        servicos_atraso = ultimo_relatorio.servicos_atraso if ultimo_relatorio else 0

        capacidade_periodo = (
            costureira.capacidade_base_semanal
            * (costureira.disponibilidade_percentual / 100)
            * SEMANAS_NO_PERIODO
        )
        eficiencia_percentual = (
            min(100, round((pecas_produzidas / capacidade_periodo) * 100, 1))
            if capacidade_periodo > 0 else 0
        )
        taxa_atraso_percentual = (
            round((servicos_atraso / total_servicos) * 100, 1)
            if total_servicos > 0 else 0
        )

        if eficiencia_percentual >= 80 and taxa_atraso_percentual < 10:
            indicador = "alta"
        elif eficiencia_percentual >= 50:
            indicador = "media"
        else:
            indicador = "baixa"

        cards.append({
            "costureira_id": costureira.id,
            "costureira_nome": costureira.nome,
            "receita_gerada": float(receita_gerada),
            "pecas_produzidas": pecas_produzidas,
            "eficiencia_percentual": eficiencia_percentual,
            "taxa_atraso_percentual": taxa_atraso_percentual,
            "indicador_performance": indicador,
        })

    return cards