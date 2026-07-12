from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CostureiraViewSet, ServicoViewSet, hello, home

# Configurar o router
router = DefaultRouter()
router.register(r'costureiras', CostureiraViewSet, basename='costureira')
router.register(r'servicos', ServicoViewSet, basename='servico')

urlpatterns = [
    path('hello/', hello),
    path('', home),
]

# Incluir as rotas do router
urlpatterns += router.urls