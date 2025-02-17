from rest_framework.serializers import ModelSerializer
from .models import Object

class OS(ModelSerializer):

    class Meta:
        model = Object
        fields = '__all__'