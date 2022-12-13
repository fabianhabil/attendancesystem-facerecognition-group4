from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .models import User
from .serializers import UserSerializer
import json


@api_view(['POST'])
def initiallize(request):
    data = JSONParser().parse(request)
    data_seriallizer = UserSerializer(data=data)
    if(data_seriallizer.is_valid):
        data_seriallizer.save()
    return Response({'response': 'added successfully!'})


@api_view(['GET'])
def get(request):
    print(request)
    user = User.objects.all()
    userSerializer = UserSerializer(user, many=True)
    return Response(userSerializer.data)


@api_view(['POST'])
def testing_post(request):
    # body = json.loads(request.body)
    # print(body)
    # print(body["Nama"])
    print(request.POST)
    return Response({'response': "mantap"})
