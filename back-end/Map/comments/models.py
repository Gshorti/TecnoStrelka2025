from django.db import models

# Create your models here.

class Comment(models.Model):
    name = models.CharField(max_length=100, null=True)
    text = models.TextField(null=False, blank=False)
    like = models.IntegerField(default=0)

    def __str__(self):
        return self.name