from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CatViewSet

router = DefaultRouter()
router.register(r'cats', CatViewSet)
"""
    - GET /cats/ — вернёт список всех кошек.
    - GET /cats/{id}/ — вернёт информацию о конкретной кошке.
    - POST /cats/ — создаст новую кошку.
    - PUT /cats/{id}/ — обновит данные существующей кошки.
    - PATCH /cats/{id}/ — обновит данные существующей кошки.
    - DELETE /cats/{id}/ — удалит кошку.
"""

urlpatterns = [
    path('', include(router.urls)),
]