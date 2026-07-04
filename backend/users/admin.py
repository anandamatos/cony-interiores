from django.contrib import admin
from .models import Cliente, Produto, Costureira, Servico, Relatorio, Financeira, Capacidade

admin.site.register(Costureira)
admin.site.register(Relatorio)
admin.site.register(Produto)
admin.site.register(Cliente)
admin.site.register(Servico)
admin.site.register(Financeira)
admin.site.register(Capacidade)