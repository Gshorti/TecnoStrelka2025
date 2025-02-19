from rest_framework.serializers import ModelSerializer
from .models import Routes, Image


class RS(ModelSerializer):

    class Meta:
        model = Routes
        fields = '__all__'


class IS(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'