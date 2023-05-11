from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    category_txt = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.category_txt}"


class Question(models.Model):
    question_text = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    isFavorite = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category} | {self.question_text}"


class FavoritedQuestion(models.Model):
    app_user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.app_user.first_name}: {self.question.question_text}"


class Response(models.Model):
    app_user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response_S = models.TextField()
    response_T = models.TextField()
    response_A = models.TextField()
    response_R = models.TextField()
    vid_link = models.URLField(blank=True, null=True)
    isPrivate = models.BooleanField(default=True)
    feedbackCounter = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.app_user.first_name}: Q:{self.question_id}. Situation: {self.response_S}, Task: {self.response_T}, Action: {self.response_A}, Result: {self.response_R}"


class Feedback(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE)
    feedback_text = models.TextField()

    def __str__(self):
        return f"{self.response} | {self.feedback_text}"
