from django.urls import path
from .views import TripListView, TripDetailView, PhotoListView, PhotoDetailView, AttractionListView, AttractionDetailView, ToDoListView, ToDoDetailView

urlpatterns = [
    path('', TripListView.as_view()),
    path('<int:pk>/', TripDetailView.as_view()),
    path('<int:pk>/photos/', PhotoListView.as_view()),
    path('<int:pk>/photos/<int:photo_pk>/', PhotoDetailView.as_view()),
    path('<int:pk>/attractions/', AttractionListView.as_view()),
    path('<int:pk>/attractions/<int:attraction_pk>/', AttractionDetailView.as_view()),
    path('<int:pk>/to_dos/', ToDoListView.as_view()),
    path('<int:pk>/to_dos/<int:to_do_pk>/', ToDoDetailView.as_view())
]