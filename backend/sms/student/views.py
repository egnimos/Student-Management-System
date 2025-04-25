from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import StudentModel
from .serializers import StudentSerializer

# Create your views here.
class ListCreateStudent(generics.ListCreateAPIView):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer
    parser_classes=[MultiPartParser, FormParser]
    

class RUDStudents(generics.RetrieveUpdateDestroyAPIView):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer
    parser_classes=[MultiPartParser, FormParser]
    
    