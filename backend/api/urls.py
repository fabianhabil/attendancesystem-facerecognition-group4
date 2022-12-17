from django.urls import path
from . import views
from . import viewsets
from rest_framework import routers
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'auth/login', viewsets.LoginViewSet, basename='auth-login')
router.register(r'auth/register', viewsets.RegistrationViewSet,
                basename='auth-register')
router.register(r'attendance', viewsets.AttendanceViewSet,
                basename='attendance')

urlpatterns = [
    path('initialize', views.initializeDataSample),
    path('get', views.get),
    path('test', views.testing_post),
    path('recognize', views.recognizeImage),
    path('savemodel', views.saveModel),
    path('getImage', views.sendImage),
    path('createCourse', views.createCourse),
    path('getCourse', views.getCourse),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    *router.urls,
]+static(settings.MEDIA_URL,
         document_root=settings.MEDIA_ROOT)
