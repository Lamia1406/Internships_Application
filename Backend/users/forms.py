from django import forms 
from django.contrib.auth.forms import AuthenticationForm
class LoginForm(AuthenticationForm):
    username = forms.CharField(label="username", max_length=50, widget=forms.TextInput())
    password = forms.CharField(label="password",max_length=200, widget=forms.TextInput())
