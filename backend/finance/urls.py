from django.urls import path

from .views import (
    financial_health,
    simulate_payment,
    listar_pagamentos_costureiras,
    planejamento_pagamentos_semanal,
    planejamento_pagamentos_mensal,
    previsao_pagamentos_endpoint,
)

urlpatterns = [
    path('health/', financial_health, name='financial_health'),
    path('payments/simulate/', simulate_payment, name='simulate_payment'),
    path('pagamentos-costureiras/', listar_pagamentos_costureiras, name='listar_pagamentos_costureiras'),
    path('payments/planejamento/semanal/', planejamento_pagamentos_semanal, name='planejamento_semanal'),
    path('payments/planejamento/mensal/', planejamento_pagamentos_mensal, name='planejamento_mensal'),
    path('payments/previsao/', previsao_pagamentos_endpoint, name='previsao_pagamentos'),
]