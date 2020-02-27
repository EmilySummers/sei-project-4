from django.urls import path
from .views import RegisterView, LoginView, UserDetailView

urlpatterns = [
  path('<int:pk>/', UserDetailView.as_view()),
  path('register', RegisterView.as_view()),
  path('login', LoginView.as_view())
]