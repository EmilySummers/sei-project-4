# Generated by Django 3.0.3 on 2020-02-26 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_auto_20200226_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]