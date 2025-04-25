from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateStudent.as_view(), name='students'),
    path('<int:pk>', v.RUDStudents.as_view(), name='rud-students'),
]