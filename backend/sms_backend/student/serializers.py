from rest_framework import serializers
from .models import StudentModel

class StudentSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentModel
        fields = ["id", "name", "roll_number", "image", "mobile_number", "email"]