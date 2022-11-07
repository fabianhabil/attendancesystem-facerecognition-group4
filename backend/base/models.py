from django.db import models


# Create your models here.

class Image(models.Model):
    image  = models.ImageField(upload_to='images')

class User(models.Model):
    fullname = models.CharField(max_length=100)
    classes = models.CharField(max_length=50,null = True)
    semester = models.IntegerField(null = True)
    age = models.IntegerField(null = True)
    id_image = models.ForeignKey(Image, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
