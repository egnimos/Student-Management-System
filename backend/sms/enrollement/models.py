from django.db import models
from student.models import BaseModel, StudentModel
from course.models import CourseModel

# Create your models here.
class EnrollementModel(BaseModel):
    course_id=models.ForeignKey(on_delete=models.CASCADE, to=CourseModel)
    student_id=models.ForeignKey(on_delete=models.CASCADE, to=StudentModel)
    grade=models.CharField(max_length=2)
    marksheet=models.FileField(upload_to='marksheet/')