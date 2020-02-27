from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model() # this ensures we use our custom model rather than django's built in auth user model

# Register your models here.
admin.site.register(User)
