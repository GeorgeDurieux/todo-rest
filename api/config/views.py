from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.views import APIView


class RootView(APIView):
    def get(self, request):
        return Response({
            'todos': reverse('todos:list', request=request),
            'login': reverse('users:login', request=request)
        })