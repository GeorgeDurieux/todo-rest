from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoListView(ListCreateAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class TodoDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

