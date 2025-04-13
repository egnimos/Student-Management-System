from django.urls import path
import views as v

urlpatterns = [
    # get and create all the enrollements
    path("enrollements", v.ListCreateEnrollement.as_view(), name="list-create-enrollement"),
    # update get and delete the enrollements
    path("enrollement/<int:pk>", v.RUDEnrollements.as_view(), name="rud-enrollement"),
]