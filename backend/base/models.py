from django.db import models


# Create your models here.

class Image(models.Model):
    image  = models.ImageField(upload_to='images')

class User(models.Model):
    fullname = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    id_image = models.ForeignKey(Image, on_delete=models.CASCADE)
    
