from django.urls import path
from . import views

urlpatterns = [
    # ... URLs existentes ...
    
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
]
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