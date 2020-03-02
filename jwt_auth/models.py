from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
  email = models.CharField(max_length=80, unique=True)
  image = models.CharField(max_length=500)
  trip_shares = models.ManyToManyField('trips.Trip', related_name='sharees+', blank=True)
  trips = models.ManyToManyField('trips.Trip', related_name='attendees', blank=True)
