from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(["GET"])
def api_root(request, format=None):
    return Response({
        "students": reverse('list-get-student', request=request, format=format),
        "courses": reverse('list-create-course', request=request, format=format),
        "enrollements": reverse('list-create-enrollement', request=request, format=format),
    })