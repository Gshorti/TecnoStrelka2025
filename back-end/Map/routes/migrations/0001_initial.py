# Generated by Django 5.1.6 on 2025-02-17 13:32

from django.db import migrations, models

from comments.models import Comment


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Routes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('data', models.JSONField(blank=True, default=dict, null=True)),

            ],
        ),
    ]
