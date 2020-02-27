from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
# import django.contrib.auth.password_validation as validations
# from django.core.exceptions import ValidationError
from trips.models import Trip
User = get_user_model()

class TripSerializer(serializers.ModelSerializer):

  class Meta:
    model = Trip
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class PopulatedUserSerializer(UserSerializer):

    trips = TripSerializer(many=True)

# class AttendeeSerializer(serializers.ModelSerializer):

#   class Meta:
#     model = User
#     fields = '__all__'

# class PopulatedAttendeeSerializer(AttendeeSerializer):

#   trips_attending = TripSerializer(many=True)