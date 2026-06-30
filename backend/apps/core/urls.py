from django.urls import path
from .import views

urlpatterns = [
    path('tarefas/', views.listar_tarefas)
]