# from django.urls import path
# from .views import hello, home

# urlpatterns = [
#     path('hello/', hello),
#     path('', home),
# ]
from rest_framework.routers import DefaultRouter
from .views import ServicoViewSet


router = DefaultRouter() #cria as rotas com suas funções: create...

router.register('servico', ServicoViewSet)

urlpatterns = router.urls