from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from Map.auth import KPtubeAuthentication
from .models import Comment
from .serializers import CS


class ComView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CS
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]