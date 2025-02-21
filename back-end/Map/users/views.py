from rest_framework.viewsets import ModelViewSet

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

    def create(self, request, *args, **kwargs):
        self.authentication_classes = []
        super().create(self, request, *args, **kwargs)