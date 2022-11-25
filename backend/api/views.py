from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from base.models import User
from base.serializers import UserSeriallizer

@api_view(['POST'])
def initiallize(request):
    data = JSONParser().parse(request)
    data_seriallizer = UserSeriallizer (data=data)
    if(data_seriallizer.is_valid):
        data_seriallizer.save()
    return Response({'response':'added successfully!'})

@api_view(['POST'])
def recognize(request):
    user = User.objects.all()
    userSeriallizer = UserSeriallizer(user, many=True)
    return Response(userSeriallizer.data)
