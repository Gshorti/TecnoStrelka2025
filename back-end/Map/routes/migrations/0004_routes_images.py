# Generated by Django 5.1.6 on 2025-02-18 18:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0003_routes_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='routes',
            name='images',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='routes.image'),
        ),
    ]
