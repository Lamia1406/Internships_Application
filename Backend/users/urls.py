from django.urls import path
from . import views
from django.contrib.auth.views import LoginView
from django.contrib.auth.views import LogoutView
urlpatterns = [
     path('accounts/login/', views.LoginForm, name="login"),


]
