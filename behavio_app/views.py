from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
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
    return JsonResponse({'success': True})


@api_view(["POST"])
def user_login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        print(username, password)
        print("User Authorized: ", user)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})


@api_view(["POST"])
def user_logout(request):
    logout(request)
    return JsonResponse({'success': True})


@api_view(["GET"])
def question(request, category_id=None):
    if category_id:
        try: 
            questions = list(Question.objects.filter(Category=category_id).values())
            return JsonResponse({'questions': questions})
        except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({'success': False})
            
    else:
        try:
            questions = list(Question.objects.all().values())
            return JsonResponse({"questions": questions})
        except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({'success': False})


@api_view(["GET"])
def category(request):
    categories = list(Category.objects.all().values())
    print(categories)
    return JsonResponse({"categories": categories})


@api_view(["POST","PUT","GET","DELETE"])
def response_handling(request, question_id, response_id=None):
    if request.method == "POST":
        try:
            response_S = request.data["response_S"]
            response_T = request.data["response_T"]
            response_A = request.data["response_A"]
            response_R = request.data["response_R"]
            vid_link   = request.data["vid_link"]
            isPrivate  = request.data["isPrivate"]
            
            new_response = Response.objects.create(
                app_user        = request.app_user,
                Question        = question_id,
                response_S      = response_S,
                response_T      = response_T,
                response_A      = response_A,
                response_R      = response_R,
                vid_link        = vid_link,
                isPrivate       = isPrivate,
                feedbackCounter = 0,
            )
            
            new_response.save()
            return JsonResponse({'success': True})
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})
            
    '''Takes data from request, iterates through each key/value and updates response by id, saves response'''
    if request.method == "PUT":
        try:
            if response_id:
                response = get_object_or_404(Response, id=response_id, app_user=request.app_user)
                data = request.data
                for key, value in data.items():
                    setattr(response, key, value)
                response.save()
                return JsonResponse({'success': True})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})
    
    if request.method == "GET":
        # GET single response
        if response_id:
            response = get_object_or_404(Response, id=response_id, app_user=request.app_user)
            response_dict = model_to_dict(response)
            return JsonResponse({"response": response_dict})
        # GET all of a user's responses
        else:
            try:
                responses = list(Response.objects.filter(app_user=request.app_user).values())
                return JsonResponse({'responses': responses})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({'responses': []})
    
    if request.method == "DELETE":
        try:
            response = get_object_or_404(Response, id=response_id, app_user=request.app_user)
            response.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})
        
        
@api_view(["POST","GET","DELETE"])
def feedback_handling(request, response_id, feedback_id=None):
    if request.method == "POST":
        try:
            feedback_text = request.data["feedback_text"]
            response = get_object_or_404(Response, id=response_id) 
            
            new_feedback = Feedback.objects.create(
                Response = response_id,
                feedback_text = feedback_text,
            )
            
            new_feedback.save()
            response.feedbackCounter += 1
            response.save()
            
            return JsonResponse({'success': True})
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})
    
    if request.method == "GET":
        try: 
            feedbacks = Feedback.objects.filter(Response=response_id)
            feedback_list = []
            
            for feedback in feedbacks:
                feedback_list.append(feedback.feedback_text)
                
            return JsonResponse({'feedback': feedback_list})
            
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})
    
    if request.method == "DELETE":
        try:
            feedback = get_object_or_404(Feedback, id=feedback_id)
            response = get_object_or_404(Response, id=feedback.Response) 
            
            feedback.delete()
            
            response.feedbackCounter -= 1
            response.save()
            return JsonResponse({'success': True})
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False})