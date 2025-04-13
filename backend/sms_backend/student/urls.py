from django.urls import path
from . import views as v

urlpatterns = [
    # get list of students and create/save new student
    path("", v.ListCreateStudents.as_view(), name="list-get-student"),
    # perform crud operations (create, read, update delete)
    path("<int:pk>", v.RUDStudents.as_view(), name="RUD-student"),
]