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