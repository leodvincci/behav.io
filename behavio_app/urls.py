from django.urls import path

from . import views

urlpatterns = [
    path("api/v1/registration", views.registration, name="registration"),
    path("api/v1/login", views.user_login, name="user_login"),
    path("api/v1/logout", views.user_logout, name="user_logout"),
]
