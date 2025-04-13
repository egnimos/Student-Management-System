from django.db import models
from student.models import BaseModel, StudentModel
from course.models import CourseModel


# Create your models here.
class EnrollementModel(BaseModel):
    student_id = models.ForeignKey(to=StudentModel, on_delete=models.CASCADE)
    course_id = models.ForeignKey(to=CourseModel, on_delete=models.CASCADE)
    grade = models.CharField(max_length=6)
    marksheet = models.FileField(upload_to='files', null=True)