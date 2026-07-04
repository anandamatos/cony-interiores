from django.db import models

class Costureira(models.Model):
    nome = models.CharField(max_length=100)
    contato = models.CharField(max_length=100, blank=True)
    observacoes = models.TextField(blank=True,)
    ativo = models.BooleanField(default=True)
    tipo_servico_preferido = models.CharField(max_length=100,blank=True)

    def __str__(self):
        return self.nome
    
class Relatorio(models.Model):
    costureira = models.ForeignKey(Costureira,on_delete=models.CASCADE,related_name="relatorios")
    periodo = models.CharField(max_length=50)
    producao_total = models.DecimalField(max_digits=10,decimal_places=2)
    pecas_produzidas = models.IntegerField()
    servicos_atraso = models.IntegerField(default=0)
    servicos_aberto = models.IntegerField(default=0)

    def __str__(self):
        return f"Relatório {self.costureira.nome} - {self.periodo}"

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    ativo = models.BooleanField(default=False)

    def __str__(self):
        return self.nome


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.IntegerField()
    email = models.EmailField()
    endereco = models.TextField()
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return self.nome


class Servico(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="servicos_cliente")
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE, related_name="servicos_produto")
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="servicos_costureira")
    quantidade = models.IntegerField(default=0)
    complexidade = models.IntegerField(default=0)
    data_envio = models.DateField()
    prazo_entrega = models.CharField(max_length=100)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"Serviço atual para {self.cliente.nome} feito por {self.costureira.nome}"


class Financeira(models.Model):
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="financeiros")
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name="financeiros")
    periodo = models.CharField(max_length=100)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    valor_pago = models.DecimalField(max_digits=10, decimal_places=2)
    pendente = models.DecimalField(max_digits=10, decimal_places=2)
    status_pagamento = models.BooleanField(default=False)
    observacoes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.costureira.nome} está para receber {self.pendente}"


class Capacidade(models.Model):
    costureira = models.ForeignKey(Costureira, on_delete=models.CASCADE, related_name="capacidades")
    semana_inicio = models.DateField()
    semana_fim = models.DateField()
    quantidade_aberto = models.IntegerField()
    indice_complexidade = models.IntegerField()
