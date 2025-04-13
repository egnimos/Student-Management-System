from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

# Create your models here.
class StudentModel(BaseModel):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='student_images', null=True)
    roll_number = models.IntegerField()
    mobile_number= models.IntegerField()
    email = models.EmailField()
    