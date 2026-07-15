from django.db import models
from django.core.validators import RegexValidator

# ==================== MODELOS EXISTENTES ====================

class Costureira(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    contato = models.CharField(max_length=100, blank=True)  # ← contato, não telefone
    observacoes = models.TextField(blank=True)
    ativo = models.BooleanField(default=True)
    tipo_servico_preferido = models.CharField(max_length=100, blank=True)

 # ---- CAMPOS NOVOS (cálculo de capacidade) ----
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
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="relatorios")
    periodo = models.CharField(max_length=50)
    producao_total = models.DecimalField(max_digits=10, decimal_places=2)
    pecas_produzidas = models.IntegerField()
    servicos_atraso = models.IntegerField(default=0)
    servicos_aberto = models.IntegerField(default=0)

    def __str__(self):
        return f"Relatório {self.costureira.nome} - {self.periodo}"


# ==================== MODELO PRINCIPAL DA STORY ====================

class Servico(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="servicos")
    produto = models.ManyToManyField(Produto, related_name="servicos")
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="servicos")
    quantidade = models.IntegerField(default=0)
    complexidade = models.IntegerField(default=0)
    data_envio = models.DateField()
    prazo_entrega = models.CharField(max_length=100)
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
 

    def __str__(self):
        return f"Serviço para {self.cliente.nome} - {self.costureira.nome}"