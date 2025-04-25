from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateEnrollement.as_view(), name='enrollements'),
    path('<int:pk>', v.RUDEnrollements.as_view(), name='rud-enrollements'),
]