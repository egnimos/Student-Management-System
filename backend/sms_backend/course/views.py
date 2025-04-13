from django.shortcuts import render
from .models import CourseModel
from .serializer import CourseSerializer
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
# get all the courses
class ListCreateCourse(generics.ListCreateAPIView):
    queryset = CourseModel.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]
    

# perform crud operations
class RUDCourse(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseModel.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]
     