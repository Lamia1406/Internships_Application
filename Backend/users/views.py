from django.http import JsonResponse
from .forms import *
from django.shortcuts import render ,HttpResponse

def front(request):
    context = { }
    return render(request, "index.html", context)

def login(request):
    if request.method == "POST":
        form = LoginForm(request.POST) 
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            print(username)
            print(password)
            var = str("form submitted" + str(request.method))
            return HttpResponse(var)
        else:
            mydictionary = {
            "form" : form
            }
        return render(request,'login.html',context=mydictionary)
    elif request.method == "GET":
        form = LoginForm()
        mydictionary = {
        "form" : form
        }
    return render(request,'login.html',context=mydictionary)

def index(request):
    return render(request,'login.html')
# Create your views here.

def authenticate(request):
    render(request,"login.js")
