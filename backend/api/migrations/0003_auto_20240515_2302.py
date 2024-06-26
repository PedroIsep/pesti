# Generated by Django 3.2.25 on 2024-05-15 22:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_map'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='title',
        ),
        migrations.AddField(
            model_name='note',
            name='imageURL',
            field=models.CharField(default=django.utils.timezone.now, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='note',
            name='model',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='note',
            name='content',
            field=models.TextField(max_length=500),
        ),
    ]
