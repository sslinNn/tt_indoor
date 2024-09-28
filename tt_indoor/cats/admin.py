from django.contrib import admin
from .models import Cat


class CatAdmin(admin.ModelAdmin):
    fields = ['name', 'age', 'breed', 'is_furry', 'breeder']


admin.site.register(Cat, CatAdmin)
