from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from Map.auth import KPtubeAuthentication
from routes.serializers import RS
from .models import Comment
from .serializers import CS
from routes.models import Routes as r


class ComView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CS
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["id"]



