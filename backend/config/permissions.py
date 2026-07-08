"""
Mapa de permissões de endpoints da API.

Política global:
- DEFAULT_PERMISSION_CLASSES = IsAuthenticated
- DEFAULT_AUTHENTICATION_CLASSES = JWTAuthentication

Endpoints públicos (AllowAny):
- GET /api/
- GET /api/hello/
- POST /api/auth/token/
- POST /api/auth/token/refresh/

Endpoints protegidos (JWT obrigatório):
- POST /api/auth/token/logout/
- Endpoints de domínio/CRUD (serviços, costureiras e futuros recursos)
"""

