from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import US
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = US
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
