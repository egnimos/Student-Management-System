from django.db import models

# Create your models here.
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract=True
        
class StudentModel(BaseModel):
    name=models.CharField(max_length=100, blank=True, default="Jhon")
    roll_number = models.IntegerField()
    mobile_number = models.IntegerField()
    email= models.EmailField()
    profile_pic=models.ImageField(upload_to='profile_pic/')
    