from rest_framework.viewsets import ModelViewSet

from Map.auth import KPtubeAuthentication
from .models import User
from .permissions import UpdateUserPermission
from .serializers import US
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = US
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, UpdateUserPermission]
    filterset_fields = ('name')
    search_fields = ['name']