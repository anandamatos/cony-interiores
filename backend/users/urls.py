from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from .views import CostureiraViewSet

router = DefaultRouter()
router.register(r'costureiras', CostureiraViewSet, basename='costureira') 

urlpatterns = [
    path('', include(router.urls)),
]