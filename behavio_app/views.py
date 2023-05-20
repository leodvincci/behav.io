from django.core import serializers
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import *
from .utils import *
import random as randGen

User = get_user_model()


# Create your views here.
@api_view(["POST"])
@permission_classes([AllowAny])
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
    return JsonResponse({"success": True})


@api_view(["GET"])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    csrf_token = request.COOKIES.get("csrftoken")
    print(f"csrf token: {csrf_token}")

    return JsonResponse({"csrf": csrf_token})


@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)

        # Filter username to return only everything before the @ symbol
        username = username.split("@")[0]
        return JsonResponse(
            {
                "success": True,
                "sessionid": request.session.session_key,
                "username": request.user.first_name.title(),
            }
        )
    else:
        return JsonResponse({"success": False})


@api_view(["POST"])
@permission_classes([AllowAny])
def user_logout(request):
    print(request.user.is_authenticated)
    logout(request)
    print("logged out")
    return JsonResponse({"success": True})


# TALK TO TEAM ABOUT THIS
#
@api_view(["GET", "PATCH"])
@permission_classes([AllowAny])
def update_question(request, question_id):
    if request.method == "PATCH":
        question = Question.objects.filter(id=question_id)
        question.isFavorite = request.data["isFavorite"]
        question.save()
        return JsonResponse({"success": True})

    if request.method == "GET":
        # GET ME ALL THE QUESTION OBJECTS THAT ARE FAVORITED
        questions = Question.objects.filter(isFavorite=True)
        return JsonResponse({"success": True, "questions": questions})


@api_view(["GET", "PATCH"])
@permission_classes([AllowAny])
def question(request, question_id=None, category_txt=None):
    print(request)
    if request.method == "GET":
        if question_id:
            try:
                questions = list(Question.objects.filter(id=question_id).values())
                return JsonResponse({"questions": questions})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"success": False})

        elif category_txt:
            try:
                the_cat = list(
                    Category.objects.filter(category_txt=category_txt).values()
                )
                questions = list(
                    Question.objects.filter(category=the_cat[0]["id"]).values()
                )

                return JsonResponse({"questions": questions})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"success": False})
        else:
            try:
                questions = list(Question.objects.all().values().order_by("id"))
                return JsonResponse({"questions": questions})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"success": False})


@api_view(["GET"])
@permission_classes([AllowAny])
def category(request):
    categories = list(Category.objects.all().values())
    print(categories)
    return JsonResponse({"categories": categories})


@api_view(["POST", "PUT", "GET", "DELETE"])
@permission_classes([AllowAny])
def response_handling(request, question_id=None, response_id=None):
    if request.method == "POST":
        try:
            response_S = request.data["response_S"]
            response_T = request.data["response_T"]
            response_A = request.data["response_A"]
            response_R = request.data["response_R"]
            vid_link = request.data["vid_link"]
            isPrivate = request.data["isPrivate"]

            print(Question)

            new_response = Response.objects.create(
                app_user=request.user,
                question=Question.objects.get(pk=question_id),
                response_S=response_S,
                response_T=response_T,
                response_A=response_A,
                response_R=response_R,
                vid_link=vid_link,
                isPrivate=isPrivate,
                feedbackCounter=0,
                question_text=Question.objects.get(pk=question_id).question_text,
            )

            new_response.save()
            return JsonResponse({"success": True})

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    """Takes data from request, iterates through each key/value and updates response by id, saves response"""
    if request.method == "PUT":
        try:
            if response_id:
                response = get_object_or_404(
                    Response, id=response_id, app_user=request.user
                )
                data = request.data
                for key, value in data.items():
                    setattr(response, key, value)
                response.save()
                return JsonResponse({"success": True})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    if request.method == "GET":
        # GET single response
        print("user 1234:", request.session.session_key)
        print(response_id)
        if response_id:
            response = get_object_or_404(
                Response, id=response_id, app_user=request.user
            )
            response_dict = model_to_dict(response)
            return JsonResponse({"response": response_dict})
        # GET all of a user's responses
        else:
            try:
                responses = list(
                    Response.objects.filter(app_user=request.user)
                    .order_by("-id")
                    .values()
                )
                return JsonResponse({"responses": responses})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"responses": []})

    if request.method == "DELETE":
        try:
            response = get_object_or_404(
                Response, id=response_id, app_user=request.user
            )
            response.delete()
            return JsonResponse({"success": True})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})


@api_view(["POST", "GET", "DELETE"])
@permission_classes([AllowAny])
def feedback_handling(request, response_id=None, feedback_id=None):
    if request.method == "POST":
        try:
            feedback_text = request.data["feedback_text"]
            response = get_object_or_404(Response, id=response_id)

            new_feedback = Feedback.objects.create(
                response=Response.objects.get(pk=response_id),
                feedback_text=feedback_text,
            )

            new_feedback.save()
            response.feedbackCounter += 1
            response.save()

            return JsonResponse({"success": True})

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    if request.method == "GET":
        if response_id:
            try:
                feedbacks = Feedback.objects.filter(response=response_id)
                feedback_list = []

                for feedback in feedbacks:
                    feedback_list.append(feedback.feedback_text)

                return JsonResponse({"feedback": feedback_list})

            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"success": False})

        else:
            # Get all feedback given for a user
            try:
                # HOW TO GET BACK ALL FEEDBACK THAT A USER HAS NO MATTER WHAT QUESTION
                user_responses = Response.objects.filter(app_user=request.user)
                feedback_list = []

                for response in user_responses:
                    feedbacks = list(
                        Feedback.objects.filter(response=response).values()
                    )
                    for feedback in feedbacks:
                        feedback_list.append(feedback)

                return JsonResponse({"feedback": feedback_list})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({"success": False})

    if request.method == "DELETE":
        try:
            feedback = get_object_or_404(Feedback, id=feedback_id)
            response = get_object_or_404(Response, id=feedback.response)

            feedback.delete()

            response.feedbackCounter -= 1
            response.save()
            return JsonResponse({"success": True})

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})


@api_view(["POST", "GET", "DELETE", "PATCH"])
@permission_classes([AllowAny])
def favorite_handling(request, question_id=None, favorite_id=None):
    # Adds question to "FavoritedQuestion" table for easy access to all favorites, also sets the 'isFavorite' field on the Questions model to True for easy access that way
    if request.method == "POST":
        try:
            question = get_object_or_404(Question, id=question_id)

            new_favorite = FavoritedQuestion.objects.create(
                app_user=request.user,
                question=Question.objects.get(pk=question_id),
            )

            new_favorite.save()

            question.isFavorite = True
            question.save()

            return JsonResponse({"success": True})

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    # GET's all favorites
    if request.method == "GET":
        try:
            questions = list(Question.objects.filter(isFavorite=True).values())

            print(f"questions: {questions}")
            print(f"Length of questons: {len(questions)}")

            # Get list of all favorited questions
            favorites = list(
                FavoritedQuestion.objects.filter(app_user=request.user).values()
            )

            print(f"favorites: {favorites}")
            print(f"Length of favorites: {len(favorites)}")

            # Add questions.isFavorite and questions.question_text to each favorited question
            for favorite in favorites:
                question = get_object_or_404(Question, id=favorite["question_id"])
                favorite["isFavorite"] = question.isFavorite
                favorite["question_text"] = question.question_text

            print(f"favorites: {favorites}")
            print(f"Length of favorites: {len(favorites)}")
            # Get question text for each favorited question

            return JsonResponse({"success": True, "questions": favorites})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    # DELETE's favorite from table, resets question 'isFavorite' value to False
    if request.method == "DELETE":
        try:
            favorite = get_object_or_404(
                FavoritedQuestion, id=favorite_id, app_user=request.user
            )
            question = get_object_or_404(Question, id=favorite.question.id)
            favorite.delete()
            question.isFavorite = False
            question.save()
            return JsonResponse({"success": True})

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"success": False})

    # PATCH's favorite, changes the isFavorite value on the question model
    # if request.method == "PATCH":
    #     try:
    #         question = get_object_or_404(Question, id=question_id)
    #         question.isFavorite = not question.isFavorite
    #         question.save()

    #         return JsonResponse({"success": True})

    #     except Exception as e:
    #         print(f"Error: {e}")
    #         return JsonResponse({"success": False})


@api_view(["GET"])
def random(request):
    questions_count = len(list(Question.objects.all()))
    random_number = randGen.randint(1, questions_count)
    rand_question = Question.objects.filter(pk=random_number)
    return JsonResponse({"question": model_to_dict(rand_question.get())})


@api_view(["POST"])
@permission_classes([AllowAny])
def auto_feedback(request, response_id):
    try:
        response = Response.objects.get(pk=response_id)
        gpt_input = {
            "user": request.user.first_name,
            "situation": response.response_S,
            "task": response.response_T,
            "action": response.response_A,
            "result": response.response_R,
            "question": response.question_text,
        }

        gpt_feedback = generate_feedback(gpt_input)

        Feedback.objects.create(
            response=response,
            feedback_text=gpt_feedback,
        )

        if gpt_feedback:
            return JsonResponse({"success": True, "feedback": gpt_feedback})

        return JsonResponse({"success": False})

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"success": False})


@api_view(["GET"])
@permission_classes([AllowAny])
def profile_responses(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        responses = list(
            Response.objects.filter(app_user=user, isPrivate=False)
            .order_by("-id")
            .values()
        )
        return JsonResponse({"responses": responses})
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"responses": []})
