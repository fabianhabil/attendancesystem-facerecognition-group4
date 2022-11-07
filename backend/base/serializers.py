from rest_framework import serializers
from base.models import User,Image

class ImageSeriallizer(serializers.ModelSerializer):
    class Meta:
        model=Image
        fields=('id','image')

class UserSeriallizer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','fullname','classes','semester','age','created','id_image_id')