# Generated by Django 3.0.3 on 2020-02-27 10:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trips', '0003_auto_20200227_1045'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='attendees',
        ),
        migrations.AddField(
            model_name='trip',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trips', to=settings.AUTH_USER_MODEL),
        ),
    ]
