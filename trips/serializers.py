from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Trip, Photo, Attraction, ToDo
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('id', 'username', 'image')

# class AttendeeSerializer(serializers.ModelSerializer): #! ISSUE?

#     class Meta:
#       model = User
#       fields = ('id', 'email')

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

  photos = PhotoSerializer(many=True)
  attractions = AttractionSerializer(many=True)
  to_dos = ToDoSerializer(many=True)
  owner = UserSerializer()
  attendees = UserSerializer(many=True)
  # attendees = AttendeeSerializer(many=True) #! OR HERE
  # attendees = UserSerializer(many=True) #! OR HERE