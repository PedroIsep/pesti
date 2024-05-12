from django.urls import path
from . import views

urlpatterns = [
    path("map/", views.MapListCreate.as_view(), name="map-list"),
    path("map/delete/<int:pk>/", views.MapDelete.as_view(), name="delete-map"),
]