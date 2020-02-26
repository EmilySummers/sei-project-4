# pylint: disable=no-member
from django.db import models

# Create your models here.
class Trip(models.Model):
  destination = models.CharField(max_length=50)
  start_date = models.DateField()
  end_date = models.DateField(blank=True, null=True)
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.destination

class Photo(models.Model):
  image = models.CharField(max_length=300)
  trip = models.ForeignKey(Trip, related_name="photos", null=True, on_delete=models.CASCADE)

  def __str__(self):
    return f'Photo {self.id} - {self.trip}'

class Attraction(models.Model):
  link = models.CharField(max_length=300)
  trip = models.ForeignKey(Trip, related_name="attractions", null=True, on_delete=models.CASCADE)

  def __str__(self):
    return f'Attraction {self.id} - {self.trip}'

class ToDo(models.Model):
  to_do = models.CharField(max_length=300)
  trip = models.ForeignKey(Trip, related_name="to_dos", null=True, on_delete=models.CASCADE)

  def __str__(self):
    return f'To do {self.id} - {self.trip}'
  