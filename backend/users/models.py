from django.db import models

class Costureira(models.Model):
    nome = models.CharField(max_length=100)
    contato = models.CharField(max_length=100, blank=True)
    observacoes = models.TextField(blank=True,)
    ativo = models.BooleanField(default=True)
    tipo_servico_preferido = models.CharField(max_length=100,blank=True)

    def __str__(self):
        return self.nome

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
    prazo_entrega = models.DateField() #MUDANÇA AQ Q PODE DAR CONFLITO
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"Serviço atual para {self.cliente.nome} feito por {self.costureira.nome}"
