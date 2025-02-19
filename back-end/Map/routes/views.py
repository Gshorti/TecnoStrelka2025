from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Routes, Image
from .serializers import RS, IS


# Create your views here.
class RoutesView(ModelViewSet):
    queryset = Routes.objects.all()
    serializer_class = RS
    authentication_classes = []


class ImageView(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = IS