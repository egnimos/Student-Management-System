from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import StudentModel
from .serializers import StudentSerializers

# Create your views here.

# get all the students
class ListCreateStudents(generics.ListCreateAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializers
    parser_classes = [MultiPartParser, FormParser]
    

# perform crud operations
class RUDStudents(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializers
    parser_classes = [MultiPartParser, FormParser]
     
