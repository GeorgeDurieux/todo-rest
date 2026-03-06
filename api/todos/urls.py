from django.urls import path

from .views import TodoListView, TodoDetailView

urlpatterns = [
    path('', TodoListView.as_view(), name='list'),
    path('todo/<int:pk>/', TodoDetailView.as_view(), name='detail'),
]