# Generated by Django 3.0.3 on 2020-02-27 11:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trips', '0004_auto_20200227_1049'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='attendees',
            field=models.ManyToManyField(blank=True, related_name='trips_attending', to=settings.AUTH_USER_MODEL),
        ),
    ]
