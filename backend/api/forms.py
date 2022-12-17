from django import forms
from .models import *


class ImageForm(forms.ModelForm):

    class Meta:
        model = ImageAbsent
        fields = ['image']


class ImageModelForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['image', 'userId']


class CourseForm(forms.ModelForm):

    class Meta:
        model = Course
        fields = ['name', 'sks']


class AttendanceForm(forms.ModelForm):

    class Meta:
        model = Attendance
        fields = ['userId', 'courseId']
