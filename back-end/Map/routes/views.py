from rest_framework.viewsets import ModelViewSet
from .models import Routes
from .serializers import RS


# Create your views here.
class RoutesView(ModelViewSet):
    queryset = Routes.objects.all()
    serializer_class = RS
    authentication_classes = []