from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import *


# Create your views here.
@api_view(["POST"])
def registration(request):
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    email = request.data["email"]
    password = request.data["password"]
    app_user = User.objects.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        username=email,
    )
    app_user.save()
    print(app_user)
    res = {"042": f"User:{email} Registration Was A Success!"}
    return JsonResponse(res)


@api_view(["POST"])
def user_login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        print(username, password)
        print("User Authorized: ", user)
        return JsonResponse({"user": username})
    else:
        return JsonResponse({"error": "User Not Authorized"})


@api_view(["POST"])
def user_logout(request):
    logout(request)
    return JsonResponse({"042": "Logout Success"})


@api_view(["GET"])
def question(request):
    questions = list(Question.objects.all().values())
    print(questions)
    return JsonResponse({"questions": questions})


@api_view(["GET"])
def category(request):
    categories = list(Category.objects.all().values())
    print(categories)
    return JsonResponse({"categories": categories})
