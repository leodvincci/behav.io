from django.urls import path

from . import views

urlpatterns = [
    path("api/v1/registration", views.registration, name="registration")
]
