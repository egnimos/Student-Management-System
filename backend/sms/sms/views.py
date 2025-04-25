from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

@api_view()
def api_root(request, format=None):
    return Response({
        "students": reverse('students', request=request, format=format),
        "courses": reverse('courses', request=request, format=format),
        "enrollements": reverse('enrollements', request=request, format=format),
    }) 