from django.urls import path

from . import views

urlpatterns = [
    path("api/v1/registration", views.registration, name="registration"),
    path("api/v1/login", views.login, name="login"),
    path("api/v1/logout", views.logout, name="logout"),
]
