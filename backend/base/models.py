from django.db import models

# Create your models here.

class User(models.Model):
    fullname = models.CharField(max_length=100)
    classes = models.CharField(max_length=50,null = True)
    semester = models.IntegerField(null = True)
    age = models.IntegerField(null = True)
    imagepath = models.CharField(max_length=200,null = True)
    created = models.DateTimeField(auto_now_add=True)
    
