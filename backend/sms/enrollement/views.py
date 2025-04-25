from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import EnrollementModel
from .serializers import EnrollementSerializer

# Create your views here.
class ListCreateEnrollement(generics.ListCreateAPIView):
    queryset=EnrollementModel.objects.all()
    serializer_class=EnrollementSerializer
    parser_classes=[MultiPartParser, FormParser]
    

class RUDEnrollements(generics.RetrieveUpdateDestroyAPIView):
    queryset=EnrollementModel.objects.all()
    serializer_class=EnrollementSerializer
    parser_classes=[MultiPartParser, FormParser]
    
    