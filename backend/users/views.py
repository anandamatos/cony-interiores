#from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Costureira
from .serializers import CostureiraSerializer
from django.urls import reverse_lazy

# ----------------------------Adicoes-------------------------------
class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()  # O SQL que ele vai rodar por trás (SELECT * FROM livro)
    serializer_class = CostureiraSerializer
    permission_classes = [AllowAny] # new


