# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Trip, Photo, Attraction, ToDo

from .serializers import TripSerializer, PopulatedTripSerializer, PhotoSerializer, AttractionSerializer, ToDoSerializer, UserSerializer

#? TRIPS

# COLLECTION - /trips
class TripListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # INDEX - MY TRIPS
  def get(self, _request):

    trips = Trip.objects.all()
    serialized_trips = PopulatedTripSerializer(trips, many=True)

    return Response(serialized_trips.data)

  # CREATE A NEW TRIP
  def post(self, request):
    request.data['owner'] = request.user.id
    trip = TripSerializer(data=request.data)

    if trip.is_valid():
      trip.save()
      return Response(trip.data, status=HTTP_201_CREATED)
    return Response(trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# MEMBER - /trips/:id
class TripDetailView(APIView): 

    # SHOW - TRIP BOARD
    def get(self, _request, pk):
        trip = Trip.objects.get(pk=pk) 
        serialized_trip = PopulatedTripSerializer(trip)

        return Response(serialized_trip.data) # send the JSON

    # DELETE A TRIP
    def delete(self, _request, pk):
    
      try:
        trip = Trip.objects.get(pk=pk)
        trip.delete()
        return Response(status=HTTP_204_NO_CONTENT)
      except Trip.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


#? PHOTOS

# COLLECTION - /trips/:id/photos
class PhotoListView(APIView):

  # ADD A PHOTO
  def post(self, request, pk):
    request.data['trip'] = pk

    photo = PhotoSerializer(data=request.data)

    if photo.is_valid():
      photo.save()
      trip = Trip.objects.get(pk=pk)
      serialized_trip = PopulatedTripSerializer(trip)
      return Response(serialized_trip.data, status=HTTP_201_CREATED)

    return Response(photo.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# MEMBER - /trips/:id/photos/:photo_id
class PhotoDetailView(APIView):

  # DELETE A PHOTO
  def delete(self, request, **kwargs):
    
    try:
      photo = Photo.objects.get(pk=kwargs['photo_pk'])
      # if comment.owner.id != request.user.id:
      #   return Response(status=HTTP_401_UNAUTHORIZED)
      photo.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except Photo.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


#? ATTRACTIONS

# COLLECTION - /trips/:id/attractions
class AttractionListView(APIView):

  # ADD A LINK
  def post(self, request, pk):
    request.data['trip'] = pk

    attraction = AttractionSerializer(data=request.data)

    if attraction.is_valid():
      attraction.save()
      trip = Trip.objects.get(pk=pk)
      serialized_trip = PopulatedTripSerializer(trip)
      return Response(serialized_trip.data, status=HTTP_201_CREATED)

    return Response(attraction.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# MEMBER - /trips/:id/attractions/:attraction_id
class AttractionDetailView(APIView):

  # DELETE A LINK
  def delete(self, request, **kwargs):
    
    try:
      attraction = Attraction.objects.get(pk=kwargs['attraction_pk'])
      # if comment.owner.id != request.user.id:
      #   return Response(status=HTTP_401_UNAUTHORIZED)
      attraction.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except Attraction.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


#? TO DOS

# COLLECTION - /trips/:id/to_dos
class ToDoListView(APIView):

  # CREATE A TO DO
  def post(self, request, pk):
    request.data['trip'] = pk

    to_do = ToDoSerializer(data=request.data)

    if to_do.is_valid():
      to_do.save()
      trip = Trip.objects.get(pk=pk)
      serialized_trip = PopulatedTripSerializer(trip)
      return Response(serialized_trip.data, status=HTTP_201_CREATED)

    return Response(to_do.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# MEMBER - /trips/:id/to_dos/:to_do_id
class ToDoDetailView(APIView):

  # DELETE A TO DO
  def delete(self, request, **kwargs):
    
    try:
      to_do = ToDo.objects.get(pk=kwargs['to_do_pk'])
      # if comment.owner.id != request.user.id:
      #   return Response(status=HTTP_401_UNAUTHORIZED)
      to_do.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except ToDo.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

#       # COMMENT COLLECTION - /films/:id/comments

# class AttendeeListView(APIView):

#   # ADD AN ATTENDEE
#   def post(self, request, pk):
#     request.data['trip'] = pk

#     email = request.data.get('email')
#     user = User.objects.get(email=email)
#     attendee = UserSerializer(data=user)

#     if attendee.is_valid():
#       attendee.save()
#       trip = Trip.objects.get(pk=pk)
#       serialized_trip = PopulatedTripSerializer(trip)
#       return Response(serialized_trip.data, status=HTTP_201_CREATED)

#     return Response(attendee.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)