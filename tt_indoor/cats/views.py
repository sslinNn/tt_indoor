from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Cat
from .serializers import CatSerializer


class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(breeder=self.request.user)

    def perform_create(self, serializer):
        serializer.save(breeder=self.request.user)
