from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from Map.auth import KPtubeAuthentication
from .models import Comment
from .serializers import CS


class ComView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CS
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["id"]



class CreateCommentView(APIView):
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        cm = ComView()
        res =  cm.create(request)
        print(res)