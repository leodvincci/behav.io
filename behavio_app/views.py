from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view


# Create your views here.
@api_view(["POST"])
def registration(request):
    res = {"042": "Success"}
    return JsonResponse(res)
