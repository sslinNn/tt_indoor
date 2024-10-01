from .serializers import CatSerializer
from .models import Cat

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(breeder=self.request.user)

    def perform_create(self, serializer):
        serializer.save(breeder=self.request.user)
