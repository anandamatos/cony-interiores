from django.db import models

# ==================== MODELOS EXISTENTES ====================

class Costureira(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    contato = models.CharField(max_length=100, blank=True)  # ← contato, não telefone
    observacoes = models.TextField(blank=True)
    ativo = models.BooleanField(default=True)
    tipo_servico_preferido = models.CharField(max_length=100, blank=True)
    capacidade_base_semanal = models.PositiveIntegerField(
        default=5,
        help_text="Quantos dias úteis de trabalho ela tem numa semana cheia."
    )
    disponibilidade_percentual = models.PositiveIntegerField(
        default=100,
        help_text="De 0 a 100, o quão livre ela está agora pra receber novos pedidos."
    )
 
    def __str__(self):
        return self.nome

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    contato = models.CharField(max_length=100, blank=True)  # ← Adicionar este campo
    email = models.EmailField(blank=True, null=True)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return self.nome


class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    valor_base = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # ---- CAMPO NOVO (cálculo de capacidade) ----
    TIPO_PRODUTO_CHOICES = [
        ("ILHO", "Cortina de Ilhó"),
        ("PREGA_MACHO", "Cortina de Prega Macho"),
        ("FORRO", "Forro"),
        ("BLACKOUT", "Blackout"),
        ("ALMOFADA", "Almofada"),
    ]
    tipo_produto = models.CharField(
        max_length=20,
        choices=TIPO_PRODUTO_CHOICES,
        blank=True,
        help_text="Categoria do produto, usada no cálculo de complexidade."
    )
 
    def __str__(self):
        return self.nome


class Relatorio(models.Model):
    # costureira fica nulo quando o relatório é o resumo GERAL (todas as
    # costureiras consolidadas) de um período - TASK-M4-CORE-001.
    costureira = models.ForeignKey(
        Costureira,
        on_delete=models.CASCADE,
        related_name="relatorios",
        null=True,
        blank=True,
        help_text="Deixe em branco para o relatório geral consolidado do período.",
    )
    periodo = models.CharField(max_length=50, help_text="Formato AAAA-MM, ex: 2026-07")
    producao_total = models.DecimalField(max_digits=10, decimal_places=2)
    pecas_produzidas = models.IntegerField()
    servicos_atraso = models.IntegerField(default=0)
    servicos_aberto = models.IntegerField(default=0)
    gerado_em = models.DateTimeField(auto_now=True)
    detalhamento_por_costureira = models.JSONField(
        default=list,
        blank=True,
        help_text="Produção de cada costureira no período (id, nome, valor, peças, atrasos, abertos).",
    )

    class Meta:
        indexes = [
            models.Index(fields=["periodo"], name="idx_relatorio_periodo"),
        ]
        ordering = ["-periodo"]

    def __str__(self):
        nome = self.costureira.nome if self.costureira else "Geral"
        return f"Relatório {nome} - {self.periodo}"


# ==================== MODELO PRINCIPAL DA STORY ====================

class Servico(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="servicos")
    produto = models.ManyToManyField(Produto, related_name="servicos")
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="servicos")
    quantidade = models.IntegerField(default=0)
    complexidade = models.IntegerField(default=0)
    criacao = models.DateField(auto_now_add=True, verbose_name="Data de Criação")
    data_envio = models.DateField(blank=True)
    prazo_entrega = models.DateField() #Correção
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    observacoes = models.TextField(blank=True)

 # ---- CAMPO NOVO (cálculo de capacidade) ----
    TAMANHO_CHOICES = [
        ("P", "Pequena"),
        ("M", "Média"),
        ("G", "Grande"),
        ("ESP", "Especial / Pé direito duplo"),
    ]
    tamanho = models.CharField(
        max_length=3,
        choices=TAMANHO_CHOICES,
        blank=True,
        help_text="Tamanho considerado pra todas as peças deste serviço (por enquanto)."
    )
<<<<<<< HEAD
 

    def __str__(self):
        return f"Serviço para {self.cliente.nome} - {self.costureira.nome}"
=======
    complexidade_manual = models.BooleanField(
        default=False,
        help_text=(
            "Se marcado, o sistema NAO recalcula a complexidade "
            "automaticamente - fica sob controle da gestora."
        ),
    )

    def __str__(self):
        return f"Serviço para {self.cliente.nome} - {self.costureira.nome}"

    class Meta:
        indexes = [
            # Índices existentes (se houver)
            models.Index(fields=["cliente", "data_envio"], name="idx_servico_cliente_data"),
            models.Index(fields=["costureira", "data_envio"], name="idx_servico_costureira_data"),
            models.Index(fields=["data_envio", "prazo_entrega"], name="idx_servico_data_prazo"),
            models.Index(fields=["valor"], name="idx_servico_valor"),
            # Índice para consultas por data_envio (já existente)
            models.Index(fields=["data_envio"], name="idx_servico_data_envio"),
        ]
        

from django.conf import settings
from django.db.models import Q, F, CheckConstraint


class PeriodoIndisponibilidade(models.Model):
    class Tipo(models.TextChoices):
        FERIAS = "FERIAS", "Férias"
        AFASTAMENTO_MEDICO = "AFASTAMENTO_MEDICO", "Afastamento médico"
        LICENCA = "LICENCA", "Licença"
        OUTRO = "OUTRO", "Outro"

    costureira = models.ForeignKey(
        "users.Costureira",
        on_delete=models.CASCADE,
        related_name="periodos_indisponibilidade",
    )
    tipo = models.CharField(max_length=30, choices=Tipo.choices)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    observacao = models.TextField(blank=True)
    criado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(data_fim__gte=F("data_inicio")),
                name="periodo_data_fim_apos_inicio",
            )
        ]
        indexes = [
            models.Index(fields=["costureira", "data_inicio", "data_fim"]),
        ]
        ordering = ["-data_inicio"]

    def __str__(self):
        return f"{self.costureira} — {self.get_tipo_display()} ({self.data_inicio} a {self.data_fim})"

    def esta_ativo_em(self, data):
        return self.data_inicio <= data <= self.data_fim

    @classmethod
    def costureira_indisponivel(cls, costureira, data):
        return cls.objects.filter(
            costureira=costureira,
            data_inicio__lte=data,
            data_fim__gte=data,
        ).exists()


class LogAuditoria(models.Model):
    class Acao(models.TextChoices):
        CRIACAO = "CRIACAO", "Criação"
        ATUALIZACAO = "ATUALIZACAO", "Atualização"
        EXCLUSAO = "EXCLUSAO", "Exclusão"

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    acao = models.CharField(max_length=20, choices=Acao.choices)
    modelo = models.CharField(max_length=100)
    objeto_id = models.CharField(max_length=50)
    campo_alterado = models.CharField(max_length=100)
    valor_anterior = models.TextField(null=True, blank=True)
    valor_novo = models.TextField(null=True, blank=True)
    justificativa = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]
>>>>>>> 5cc7c664acf5526a65fd42dd45af26adb6b76b93
