# Generated by Django 3.0.3 on 2020-02-29 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_auto_20200228_1200'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(default='default user', max_length=50),
            preserve_default=False,
        ),
    ]
