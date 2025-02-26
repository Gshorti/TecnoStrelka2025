from rest_framework.serializers import ModelSerializer
from .models import User

class US(ModelSerializer):

    class Meta:
        model = User
        fields = ["name", "email", "routes","password", "visited", "id"]  #ghhhhfghhghghhgf
        extra_kwargs = {'password': {'write_only': True}}



