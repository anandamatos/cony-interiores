from __future__ import annotations

from django.conf import settings
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from finance.openapi import build_openapi_schema

from .metrics import metrics_registry


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monitoring_dashboard(request):
    snapshot = metrics_registry.snapshot()
    snapshot['financial_alert_threshold_ms'] = settings.FINANCIAL_API_ALERT_THRESHOLD_MS
    snapshot['generated_for_user'] = request.user.get_username()
    return Response(snapshot)


@api_view(['GET'])
@permission_classes([AllowAny])
def openapi_schema(request):
    return Response(build_openapi_schema())


@api_view(['GET'])
@permission_classes([AllowAny])
def swagger_ui(request):
    html = """
<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <title>Cony Financial API - Swagger</title>
    <link rel=\"stylesheet\" href=\"https://unpkg.com/swagger-ui-dist@5/swagger-ui.css\" />
    <style>
      body { margin: 0; background: #f5f7fb; }
      #swagger-ui { max-width: 1200px; margin: 0 auto; }
    </style>
  </head>
  <body>
    <div id=\"swagger-ui\"></div>
    <script src=\"https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js\"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: '/api/docs/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
      });
    </script>
  </body>
</html>
""".strip()
    return HttpResponse(html)
