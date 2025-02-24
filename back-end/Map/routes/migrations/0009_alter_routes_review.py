# Generated by Django 5.1.6 on 2025-02-24 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0008_routes_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routes',
            name='review',
            field=models.CharField(choices=[('b', 'bad'), ('g', 'good'), ('u', 'unconfirmed')], default='unconfirmed', max_length=20),
        ),
    ]
