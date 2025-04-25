from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateCourses.as_view(), name='courses'),
    path('<int:pk>', v.RUDCourses.as_view(), name='rud-courses'),
]