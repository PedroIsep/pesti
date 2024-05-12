from django.db import models


class Map(models.Model):
    imageURL = models.CharField(max_length=500)
    model = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.title