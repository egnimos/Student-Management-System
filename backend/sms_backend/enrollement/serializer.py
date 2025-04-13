from rest_framework import serializers
from .models import EnrollementModel

class EnrollementSerializer(serializers.ModelSerializer):
    class Meta:
        model= EnrollementModel
        fields=["id", "student_id", "course_id", "grade", "marksheet"]