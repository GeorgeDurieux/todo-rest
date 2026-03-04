from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers import UserRegistrationSerializer, UserLoginSerializer


class UserRegistrationView(APIView):
    authentication_class = []
    permission_classes = []

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class UserLogoutView(APIView):

    def delete(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)

