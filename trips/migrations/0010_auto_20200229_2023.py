# Generated by Django 3.0.3 on 2020-02-29 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0009_trip_public'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='public',
        ),
        migrations.AddField(
            model_name='trip',
            name='private',
            field=models.BooleanField(default=True),
        ),
    ]
