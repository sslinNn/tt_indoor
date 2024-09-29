from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cat


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = '__all__'
