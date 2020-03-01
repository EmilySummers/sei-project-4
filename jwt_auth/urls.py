from django.urls import path
from .views import RegisterView, LoginView, UserListView, UserDetailView, ProfileView

urlpatterns = [
  path('<int:pk>/', UserDetailView.as_view()),
  path('register', RegisterView.as_view()),
  path('login', LoginView.as_view()),
  path('profile', ProfileView.as_view()),
  path('roamers', UserListView.as_view())
  # path('<int:pk>/trips/', TripListView.as_view())
]