from datetime import datetime, timedelta # imported from python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_201_CREATED
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, EditUserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration successful'})

        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    # def get_user(self, email):
    #     try:
    #         return User.objects.get(email=email)
    #     except User.DoesNotExist:
    #         raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        try:
          user = User.objects.get(email=email)
          if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

          dt = datetime.now() + timedelta(days=7)
          token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

          return Response({'token': token, 'message': f'Welcome back {user.username}!'})

        except User.DoesNotExist:
          raise PermissionDenied({'message': 'Invalid Credentials'})

# COLLECTION - /roamers
class UserListView(APIView):

  # permission_classes = (IsAuthenticatedOrReadOnly, )

  # INDEX - ALL USERS
  def get(self, _request):
    print(User.objects.all())
    users = User.objects.all()
    serialized_users = PopulatedUserSerializer(users, many=True)

    return Response(serialized_users.data)

class UserDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    # SHOW - SINGLE USER
    def get(self, _request, pk):
        user = User.objects.get(pk=pk) 
        serialized_user = PopulatedUserSerializer(user)

        return Response(serialized_user.data) # send the JSON

    # DELETE USER
    def delete(self, _request, pk):
      user = User.objects.get(pk=pk)
      user.delete()
      return Response(status=HTTP_204_NO_CONTENT)
      # except User.DoesNotExist:
      #   return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    # EDIT USER/PROFILE
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        updated_user = EditUserSerializer(user, data=request.data)
        # print(updated_user)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data)
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)

# #? TRIPS
# # COLLECTION - /:id/trips
# class TripListView(APIView):

#   # CREATE (JOIN) A TRIP
#   def put(self, request, pk):
#     user = User.objects.get(pk=request.user.id)
    
#     trip = TripSerializer(data=request.data)
#     user.trips.append(trip)
#     print(user)
#     # trip = TripSerializer(data=request.data)

    # if trip.is_valid():
    #   trip.save()
    #   user = User.objects.get(pk=pk)
    #   serialized_user = PopulatedUserSerializer(user)
    #   return Response(serialized_user.data, status=HTTP_201_CREATED)

    # return Response(trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

#     def post(self, request, pk):
#         user = User.objects.get(pk=request.user.id)
        
#         serialized_trip = TripSerializer(data=request.data)
#         if serialized_trip.is_valid():
#           request.user.trips.append(serialized_trip)
#           return Response(request.user)
#         return Response(serialized_trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        
#         # request.data['attendees'] = request.user.id
#         # serialized_trip = JoinTripSerializer(data=request.data)
#         # if serialized_trip.is_valid():
#         #     serialized_trip.save()
#         #     return Response(serialized_trip.data)
#         # return Response(serialized_trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

#         # request.data['trips'] = 