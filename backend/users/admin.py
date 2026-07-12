from django.contrib import admin
from .models import Cliente, Produto, Costureira, Servico, Relatorio

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Produto)
admin.site.register(Costureira)
admin.site.register(Servico)
admin.site.register(Relatorio)