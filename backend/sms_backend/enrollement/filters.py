import django_filters
from .models import EnrollementModel

class EnrollementFilter(django_filters.FilterSet):
    class Meta:
        model = EnrollementModel
        fields = ["student_id", "course_id"]