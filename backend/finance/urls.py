from django.urls import path

from .views import financial_health, simulate_payment

urlpatterns = [
    path('health/', financial_health, name='financial_health'),
    path('payments/simulate/', simulate_payment, name='simulate_payment'),
]
