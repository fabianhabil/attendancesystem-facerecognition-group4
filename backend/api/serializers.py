from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.validators import UniqueValidator
from .models import User
from rest_framework import status


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'fullname', 'classes', 'semester', 'age', 'imagepath', 'created',
                  'email', 'is_superuser', 'last_login', 'is_active', 'is_staff']
        read_only_field = ['is_active', 'created',
                           'is_superuser', 'last_login', 'is_staff']


# -------------------------------------------------------------------------------------
# Auth
class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    fullname = serializers.CharField()
    classes = serializers.CharField()
    semester = serializers.IntegerField()
    age = serializers.IntegerField()
    imagepath = serializers.CharField()
    created = serializers.DateTimeField(required=False)
    is_active = serializers.BooleanField(required=False)
    is_staff = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = ['id', 'fullname', 'classes', 'semester', 'age', 'imagepath', 'created',
                  'email', 'is_superuser', 'last_login', 'is_active', 'is_staff', 'password']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
            if user:
                res = serializers.ValidationError(
                    {'Duplicate': 'Email Address'})
                res.status_code = 409
                raise res
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
