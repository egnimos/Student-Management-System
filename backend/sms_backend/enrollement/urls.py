from django.urls import path
from . import views as v

urlpatterns = [
    # get and create all the enrollements
    path("", v.ListCreateEnrollement.as_view(), name="list-create-enrollement"),
    # update get and delete the enrollements
    path("<int:pk>", v.RUDEnrollements.as_view(), name="rud-enrollement"),
]