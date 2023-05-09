from django.urls import path

from . import views

urlpatterns = [
    path("api/v1/registration", views.registration, name="registration"),
    path("api/v1/login", views.user_login, name="user_login"),
    path("api/v1/logout", views.user_logout, name="user_logout"),
    path("api/v1/questions", views.question, name="questions"),
    path(
        "api/v1/questions/<int:question_id>/",
        views.question,
        name="questions_by_question_id",
    ),    path(
        "api/v1/questions/<str:category_txt>/",
        views.question,
        name="questions_by_category",
    ),
    path("api/v1/categories", views.category, name="categories"),
    path("api/v1/responses/", views.response_handling, name="get_user_responses"),
    path(
        "api/v1/response/<int:question_id>/",
        views.response_handling,
        name="create_response",
    ),
    path(
        "api/v1/response/<int:response_id>/",
        views.response_handling,
        name="update_or_delete_response",
    ),
    path(
        "api/v1/feedback/<int:response_id>/",
        views.feedback_handling,
        name="create_or_get_feedback",
    ),
    path(
        "api/v1/feedback/<int:feedback_id>",
        views.feedback_handling,
        name="delete_feedback",
    ),
]
