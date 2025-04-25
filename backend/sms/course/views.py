from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CourseModel
from .serializers import CourseSerializer

# Create your views here.
class ListCreateCourses(generics.ListCreateAPIView):
    queryset=CourseModel.objects.all()
    serializer_class=CourseSerializer
    parser_classes=[MultiPartParser, FormParser]
    

class RUDCourses(generics.RetrieveUpdateDestroyAPIView):
    queryset=CourseModel.objects.all()
    serializer_class=CourseSerializer
    parser_classes=[MultiPartParser, FormParser]

    
    