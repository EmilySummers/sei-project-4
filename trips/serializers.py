from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Trip, Photo, Attraction, ToDo
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('id', 'username', 'profile_image')

class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = '__all__'

class AttractionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attraction
        fields = '__all__'

class ToDoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'

class PopulatedTripSerializer(TripSerializer):

  attendees = UserSerializer(many=True)
  photos = PhotoSerializer(many=True)
  attractions = AttractionSerializer(many=True)
  to_dos = ToDoSerializer(many=True)