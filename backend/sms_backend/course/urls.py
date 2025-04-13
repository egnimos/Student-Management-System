from django.urls import path
import views as v

urlpatterns = [
    # get and create all the enrollements
    path("courses", v.ListCreateCourse.as_view(), name="list-create-course"),
    # update get and delete the enrollements
    path("course/<int:pk>", v.RUDCourse.as_view(), name="rud-course"),
]