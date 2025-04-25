from django.db import models
from student.models import BaseModel

# Create your models here.
class CourseModel(BaseModel):
    title=models.CharField(max_length=100)
    description=models.TextField()
    thumbnail=models.ImageField(upload_to='thumbnail/',  
                                default="https://cdn.pixabay.com/photo/2020/06/25/17/57/microphone-5340340_1280.jpg")