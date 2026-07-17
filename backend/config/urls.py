from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from monitoring.views import monitoring_dashboard, openapi_schema, swagger_ui

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='swagger_ui', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/core/', include('apps.core.urls')),
    path('api/financial/', include('finance.urls')),

    # Autenticação JWT
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Monitoramento
    path('api/internal/monitoring/dashboard/', monitoring_dashboard, name='monitoring_dashboard'),

    # Documentação da API
    path('api/docs/openapi.json', openapi_schema, name='openapi_schema'),
    path('api/docs/swagger/', swagger_ui, name='swagger_ui'),
]