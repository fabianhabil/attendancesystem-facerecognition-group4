from rest_framework import serializers
from base.models import User

class UserSeriallizer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','fullname','classes','semester','age','created','imagepath')