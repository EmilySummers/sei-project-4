from datetime import datetime, timedelta # imported from python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer
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

class UserDetailView(APIView):

    # SHOW - PROFILE
    def get(self, _request, pk):
        user = User.objects.get(pk=pk) 
        serialized_user = PopulatedUserSerializer(user)

        return Response(serialized_user.data) # send the JSON
