from django.shortcuts import render
from rest_framework import generics
from .serializers import MapSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Map

class MapListCreate(generics.ListCreateAPIView):
    serializer_class = MapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Map.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class MapDelete(generics.DestroyAPIView):
    serializer_class = MapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Map.objects.filter(author=user)

