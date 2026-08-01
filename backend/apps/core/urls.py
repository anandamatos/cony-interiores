from django.urls import path

from . import views

urlpatterns = [
    path(
        'costureiras/carga/',
        views.listar_cargas,
        name='listar-cargas',
    ),
    path(
        'costureiras/<int:costureira_id>/carga/',
        views.consultar_carga,
        name='consultar-carga',
    ),
    path(
        'servicos/<int:servico_id>/sugestao-costureira/',
        views.sugerir_alocacao,
        name='sugerir-alocacao',
    ),
]