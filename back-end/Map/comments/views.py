from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
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
        serializer = CS(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res = Response(serializer.data, status=status.HTTP_201_CREATED)
            print(res)
            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)