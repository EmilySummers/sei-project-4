from rest_framework import serializers

from .models import Trip, Photo, Attraction, ToDo

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