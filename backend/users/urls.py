<<<<<<< HEAD
from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from .views import CostureiraViewSet

router = DefaultRouter()
router.register(r'costureiras', CostureiraViewSet, basename='costureira') 

urlpatterns = [
    path('', include(router.urls)),
]
=======
from django.urls import path
from .views import hello, home
from rest_framework.routers import DefaultRouter
from .views import ServicoViewSet

router = DefaultRouter() #cria as rotas com suas funções: create...

router.register('servico', ServicoViewSet)

urlpatterns = [
    path('hello/', hello),
    path('', home),
]

urlpatterns += router.urls
>>>>>>> 1703937 (fix: resolve erros de configuração após integração com Docker)
