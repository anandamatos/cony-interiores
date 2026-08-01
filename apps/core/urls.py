from django.urls import path
from . import views

urlpatterns = [
    # ===== CAPACIDADE =====
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
    
    # ===== ALOCAÇÃO =====
    path(
        'servicos/<int:servico_id>/sugestao-costureira/',
        views.sugerir_alocacao,
        name='sugerir-alocacao',
    ),
    
    # ===== RELATÓRIOS =====
    path(
        'relatorios/mensal/',
        views.listar_relatorios_mensais,
        name='listar-relatorios-mensais',
    ),
    path(
        'relatorios/mensal/gerar/',
        views.gerar_relatorio_mensal_view,
        name='gerar-relatorio-mensal',
    ),
    path(
        'relatorios/atrasos/',
        views.listar_atrasos_view,
        name='listar-atrasos',
    ),
    path(
        'relatorios/agendamento/',
        views.executar_agendamento_view,
        name='executar-agendamento',
    ),
    
    # ===== EXPORTAÇÃO CSV =====
    # TASK-M4-CORE-004
    path(
        'relatorios/mensal/exportar/csv/',
        views.exportar_relatorio_mensal_csv,
        name='exportar-relatorio-mensal-csv',
    ),
    path(
        'relatorios/atrasos/exportar/csv/',
        views.exportar_atrasos_csv,
        name='exportar-atrasos-csv',
    ),
    
    # ===== EXPORTAÇÃO PDF =====
    # TASK-M4-CORE-005
    path(
        'relatorios/mensal/exportar/pdf/',
        views.exportar_relatorio_mensal_pdf,
        name='exportar-relatorio-mensal-pdf',
    ),
    path(
        'relatorios/atrasos/exportar/pdf/',
        views.exportar_atrasos_pdf,
        name='exportar-atrasos-pdf',
    ),
    
    # ===== FILTROS AVANÇADOS =====
    # TASK-M4-CORE-006
    path(
        'servicos/filtrados/',
        views.listar_servicos_com_filtros,
        name='listar-servicos-filtrados',
    ),
    path(
        'pagamentos/filtrados/',
        views.listar_pagamentos_com_filtros,
        name='listar-pagamentos-filtrados',
    ),
]