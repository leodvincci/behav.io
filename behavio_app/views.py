from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User


# Create your views here.
@api_view(["POST"])
def registration(request):
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    email = request.data["email"]
    password = request.data["password"]
    app_user = User(first_name=first_name, last_name=last_name, email=email, password=password, username = email)
    app_user.save()
    print(app_user)
    res = {"042": f"User:{email} Registration Was A Success!"}
    return JsonResponse(res)
