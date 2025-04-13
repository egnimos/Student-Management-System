from django.urls import path
import views as v

urlpatterns = [
    # get list of students and create/save new student
    path("students", v.ListCreateStudents.as_view(), name="list-get-student"),
    # perform crud operations (create, read, update delete)
    path("student/<int:pk>", v.RUDStudents.as_view(), name="RUD-student"),
]