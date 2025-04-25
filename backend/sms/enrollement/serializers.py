from rest_framework import serializers
from .models import EnrollementModel

class EnrollementSerializer(serializers.ModelSerializer):
    class Meta:
        model=EnrollementModel
        fields=['id', 'course_id', 'student_id', 'grade', 'marksheet']