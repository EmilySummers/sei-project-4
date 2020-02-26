# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Trip
from .serializers import TripSerializer

# Create your views here.
# COLLECTION - /films
class TripListView(APIView):

  # permission_classes = (IsAuthenticatedOrReadOnly, ) # is it any request other than get (read only), if yes then you need a token

  # INDEX
  def get(self, _request):

    trips = Trip.objects.all()
    serialized_trips = TripSerializer(trips, many=True)

    return Response(serialized_trips.data)

class TripDetailView(APIView): # extend the APIView

    def get(self, _request, pk):
        trip = Trip.objects.get(pk=pk) # get a book by id (pk means primary key)
        serialized_trip = TripSerializer(trip)

        return Response(serialized_trip.data) # send the JSON to the client