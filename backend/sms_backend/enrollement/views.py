from django.shortcuts import render
from .models import EnrollementModel
from .serializer import EnrollementSerializer
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EnrollementFilter

# Create your views here.
# get all the enrollements
class ListCreateEnrollement(generics.ListCreateAPIView):
    queryset = EnrollementModel.objects.all()
    serializer_class = EnrollementSerializer
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = EnrollementFilter
    

# perform crud operations
class RUDEnrollements(generics.RetrieveUpdateDestroyAPIView):
    queryset = EnrollementModel.objects.all()
    serializer_class = EnrollementSerializer
    parser_classes = [MultiPartParser, FormParser]
     