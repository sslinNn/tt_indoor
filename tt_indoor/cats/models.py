from django.db import models
from django.contrib.auth.models import User


class Cat(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    breed = models.CharField(max_length=100)
    is_furry = models.BooleanField()
    breeder = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
