from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from . import viewsets
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'auth/login', viewsets.LoginViewSet, basename='auth-login')
router.register(r'auth/register', viewsets.RegistrationViewSet,
                basename='auth-register')
router.register(r'auth/refresh', viewsets.RefreshViewSet,
                basename='auth-refresh')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('initiallize', views.initiallize),
    path('get', views.get),
    path('test', views.testing_post),
    *router.urls
]
