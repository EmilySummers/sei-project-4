from django.contrib import admin
from .models import Trip, Photo, Attraction, ToDo

# Register your models here.
admin.site.register(Trip)
admin.site.register(Photo)
admin.site.register(Attraction)
admin.site.register(ToDo)
