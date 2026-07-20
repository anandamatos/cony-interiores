from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CostureiraViewSet, ServicoViewSet, ClienteViewSet, ProdutoViewSet, hello, home

# Configurar o router
router = DefaultRouter()
router.register(r'costureiras', CostureiraViewSet, basename='costureira')
router.register(r'servicos', ServicoViewSet, basename='servico')
router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'metricas', MetricaViewSet, basename='metrica') #novo

urlpatterns = [
    path('hello/', hello),
    path('', home),
    path('', include(router.urls)),
]

# Incluir as rotas do router
urlpatterns += router.urls