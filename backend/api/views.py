from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .models import *
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from ai.main import writeDataSet, recognize, moveModel
from .forms import *
from django.http import JsonResponse
from django.core import serializers
import base64
import json


@api_view(['GET'])
@permission_classes([AllowAny])
def get(request):
    print(request)
    user = User.objects.all()
    userSerializer = UserSerializer(user, many=True)
    return Response(userSerializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def testing_post(request):
    body = json.loads(request.body)
    print(body["test"])
    return Response({'response': "mantap"})


@api_view(['GET'])
@permission_classes([AllowAny])
def initializeDataSample(request):
    process = writeDataSet()
    if process == True:
        return Response({"response": 'success'}, 200)
    else:
        return Response({"response": "error"}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def recognizeImage(request):
    courseId = request.POST['courseId'][0]
    form = ImageForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        result = recognize()
        if result == None:
            return Response({"response": "error"}, status=400)
        elif result == "Not Found":
            return Response({"response": "not found"}, status=404)
        else:
            user = User.objects.get(id=result)
            course = Course.objects.get(id=courseId)
            attendanceQuery = Attendance.objects.create(
                userId=user, courseId=course)
            attendanceQuery.save()
            user = User.objects.filter(id=result).values_list('fullname')
            return JsonResponse({"response": user[0]}, status=200)
    else:
        return Response({"response": "error"}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def saveModel(request):
    userId = request.POST['userId'][0]
    form = ImageModelForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        valid = moveModel(userId)
        if valid == True:
            user = User.objects.get(id=userId)
            user.haveModel = True
            user.save()
            return Response({"response": "berhasil"}, status=200)
        else:
            return Response({"response": "error"}, status=400)
    else:
        return Response({"response": "error"}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def sendImage(request):
    body = json.loads(request.body)
    userId = body['userId']
    with open(f"./images/models/{userId}/1.jpeg", "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')

    return Response({"response": "berhasil", "image_data": image_data}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def createCourse(request):
    form = CourseForm(request.POST)
    if form.is_valid():
        form.save()
        return Response({"response": "berhasil"}, status=200)
    else:
        return Response({"response": "error"}, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def getCourse(request):
    course = list(Course.objects.values())
    return Response({"response": "berhasil", "course": course}, status=200)