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



class CreateCommentView(APIView):
    authentication_classes = [KPtubeAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        serializer = CS(data=request.data)
        route_ID = request.data["route_ID"]
        if serializer.is_valid():
            serializer.save()
            res = serializer.data
            res = res["id"]
            route = r.objects.get(pk=route_ID)
            goida = RS(route)
            goida = goida.data
            goida = goida["comments"]
            goida.append(res)
            new_goida = RS(route, data={"comments":goida})
            if new_goida.is_valid():
                new_goida.save()

            return Response({"result":"Я респонз, сообщающий вам весть об успешной обработке реквеста"}, status=status.HTTP_201_CREATED)
            # return Response(res, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)