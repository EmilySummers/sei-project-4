# Generated by Django 3.0.3 on 2020-03-03 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0011_auto_20200229_2025'),
        ('jwt_auth', '0007_user_trip_requests'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='trip_requests',
            field=models.ManyToManyField(blank=True, related_name='requestees', to='trips.Trip'),
        ),
    ]
