from django.urls import path, include
from .import views
# ----------------------------↓Adicoes-------------------------------
from rest_framework.routers import DefaultRouter 
from .views import CostureiraViewSet

router = DefaultRouter()
router.register(r'costureiras', CostureiraViewSet) 

urlpatterns = [
    path('CRUD/', include(router.urls)),
# ----------------------------Adicoes↑-------------------------------
    path('tarefas/', views.listar_tarefas),
]