from django.shortcuts import render
from django.http import JsonResponse


# Create your views here.
def registration(request):
    res = {"042": "Success"}
    return JsonResponse(res)
