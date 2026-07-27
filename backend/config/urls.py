from django.contrib import admin
from django.urls import path, include
from users.views import home
from monitoring.views import monitoring_dashboard, openapi_schema, swagger_ui

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/financial/', include('finance.urls')),
    path('api/internal/monitoring/dashboard/', monitoring_dashboard, name='monitoring_dashboard'),
    path('api/docs/openapi.json', openapi_schema, name='openapi_schema'),
    path('api/docs/swagger/', swagger_ui, name='swagger_ui'),
]
