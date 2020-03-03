from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
  email = models.CharField(max_length=80, unique=True)
  image = models.CharField(max_length=500)
  trips = models.ManyToManyField('trips.Trip', related_name='attendees', blank=True)
  trip_shares = models.ManyToManyField('trips.Trip', related_name='sharees+', blank=True)
  trip_requests = models.ManyToManyField('trips.Trip', related_name='requesters+', blank=True)
  trip_offers = models.ManyToManyField('trips.Trip', related_name='requestees+', blank=True)
