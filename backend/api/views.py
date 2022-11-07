from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def post(request):
    person = {'nama': 'Fabian Habil', 'age': 28}
    return Response(person)
