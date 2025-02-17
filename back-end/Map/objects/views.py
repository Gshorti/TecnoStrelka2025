from rest_framework.viewsets import ModelViewSet
from .models import Object
from .serializers import OS


# Create your views here.

class ObjView(ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = OS
    authentication_classes = []