from rest_framework.serializers import ModelSerializer
from .models import Comment

class CS(ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'