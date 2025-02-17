from rest_framework.serializers import ModelSerializer
from .models import Routes

class RS(ModelSerializer):

    class Meta:
        model = Routes
        fields = '__all__'