from django.db import models
from student.models import BaseModel

# Create your models here.
class CourseModel(BaseModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='course_thumbnails', null=True)