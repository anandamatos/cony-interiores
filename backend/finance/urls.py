from django.urls import path
from .views import financial_health, simulate_payment, listar_pagamentos_costureiras

urlpatterns = [
    path('health/', financial_health, name='financial_health'),
    path('payments/simulate/', simulate_payment, name='simulate_payment'),
    path('pagamentos-costureiras/', listar_pagamentos_costureiras, name='listar_pagamentos_costureiras'),
]