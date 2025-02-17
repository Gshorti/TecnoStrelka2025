from django.db import models

# Create your models here.

class Comment(models.Model):
    name = models.CharField(max_length=100, null=True)
    text = models.TextField(null=False, blank=False)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.name