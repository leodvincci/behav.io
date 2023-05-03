from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email           = models.EmailField(unique=True)
    first_name      = models.CharField(max_length=255)
    last_name       = models.CharField(max_length=255)
    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f"{self.name} | {self.email}"
    
class Category(models.Model):
    category_txt    = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.category_text}"
    
class Question(models.Model):
    question_text   = models.TextField()
    Category        = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category} | {self.question_text}"

class FavoritedQuestion(models.Model):
    User            = models.ForeignKey(User, on_delete=models.CASCADE)
    Question        = models.ForeignKey(Question, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user_id.name}: {self.question_id.question_text}"

class Response(models.Model):
    User            = models.ForeignKey(User, on_delete=models.CASCADE)
    Question        = models.ForeignKey(Question, on_delete=models.CASCADE)
    response_S      = models.TextField()
    response_T      = models.TextField()
    response_A      = models.TextField()
    response_R      = models.TextField()
    vid_link        = models.URLField(blank=True, null=True)
    isPrivate       = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user_id.name}: Q:{self.question_id}. Situation: {self.response_S}, Task: {self.response_T}, Action: {self.response_A}, Result: {self.response_R}"

class Feedback(models.Model):
    Response        = models.ForeignKey(Response, on_delete=models.CASCADE)
    feedback_text   = models.TextField()
    
    def __str__(self):
        return f"{self.response_id} | {self.feedback_text}"