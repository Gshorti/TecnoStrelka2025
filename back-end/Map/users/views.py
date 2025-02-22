from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from Map.auth import KPtubeAuthentication
from .models import User
from .permissions import UpdateUserPermission
from .serializers import US
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


# Create your views here.

class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = US
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticated, UpdateUserPermission]
    filterset_fields = ('name')
    search_fields = ['name']

class CreateUser(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = US