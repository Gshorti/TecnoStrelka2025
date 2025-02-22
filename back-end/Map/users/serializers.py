from rest_framework.serializers import ModelSerializer
from .models import User

class US(ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}




