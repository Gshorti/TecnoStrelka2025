from django.db import models

from comments.models import Comment

# Create your models here.

class Image(models.Model):
    image = models.FileField(upload_to="images")

class Routes(models.Model):
    name = models.CharField(max_length=1000, null=True)
    data = models.JSONField(null=True, blank=True, default=dict)
    comments = models.ManyToManyField(Comment, null=True, blank=True)
    images = models.ManyToManyField(Image, null=True)
    history = models.JSONField(default=list, null=True)


    def __str__(self):
        return self.name


