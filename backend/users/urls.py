from django.urls import path
from .views import (
    ThrottledTokenObtainPairView,
    ThrottledTokenRefreshView,
    hello,
    home,
    me,
)

urlpatterns = [
    path('hello/', hello),
    path('', home),
    path('auth/token/', ThrottledTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', ThrottledTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', me, name='auth_me'),
]
