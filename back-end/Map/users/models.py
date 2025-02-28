from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    routes = models.ManyToManyField('routes.Routes',
                               null=True, blank=True, related_name='author')

    visited = models.JSONField(default=list)

    def __str__(self):
        return self.name

    def is_authenticated(self):
        return True