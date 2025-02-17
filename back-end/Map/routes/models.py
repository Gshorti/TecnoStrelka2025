from django.db import models

# Create your models here.

class Routes(models.Model):
    name = models.CharField(max_length=1000, null=True)
    data = models.BinaryField(null=True, blank=True)

    def __str__(self):
        return self.name