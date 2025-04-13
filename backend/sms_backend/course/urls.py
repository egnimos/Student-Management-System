from django.urls import path
from . import views as v


urlpatterns = [
    # get and create all the enrollements
    path("", v.ListCreateCourse.as_view(), name="list-create-course"),
    # update get and delete the enrollements
    path("<int:pk>", v.RUDCourse.as_view(), name="rud-course"),
]