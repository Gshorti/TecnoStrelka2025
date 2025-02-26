from django.db import models

from comments.models import Comment

# Create your models here.

class Image(models.Model):
    image = models.FileField(upload_to="images")

class Routes(models.Model):

    choices = [
        ("b","bad"),
        ("g","good"),
        ("u","unconfirmed")
    ]

    name = models.CharField(max_length=1000, null=True)
    data = models.JSONField(null=True, blank=True, default=dict)
    comments = models.JSONField(default=list, blank=True)
    images = models.ManyToManyField(Image, null=True)
    history = models.JSONField(default=list, null=True)
    description = models.TextField(null=False, default="YTNE")
    private = models.BooleanField(default=False)
    review = models.CharField(max_length=20, choices=choices, default="unconfirmed")

    def __str__(self):
        return self.name


