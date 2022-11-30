from django.urls import path
from . import views

urlpatterns = [
    path('initiallize', views.initiallize),
    path('recognize',views.recognize)
]
