from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.throttling import ScopedRateThrottle
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class ThrottledTokenObtainPairView(TokenObtainPairView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'auth'


class ThrottledTokenRefreshView(TokenRefreshView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'auth'

@api_view(['GET'])
@permission_classes([AllowAny])
def hello(request):
    return Response({"message": "Hello Cony Interiores!"})

@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"message": "Bem-vindo ao backend Cony Interiores!"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(
        {
            "id": request.user.id,
            "username": request.user.get_username(),
            "is_authenticated": request.user.is_authenticated,
        }
    )
