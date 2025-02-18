from django.db import models

from comments.models import Comment


# Create your models here.

class Routes(models.Model):
    name = models.CharField(max_length=1000, null=True)
    data = models.JSONField(null=True, blank=True, default=dict)
    comments = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.name


class Image(models.Model):
    image = models.FileField(upload_to="images")