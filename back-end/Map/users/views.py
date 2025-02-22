from rest_framework import status
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

def post(request):
    name = request.data["name"]
    email = request.data["email"]
    users = User.objects.all()
    for user in users:
        if user.name == name:
            return Response("Invalid name", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    for user in users:
        if user.email == email:
            return Response("Invalid email", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer = US(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)