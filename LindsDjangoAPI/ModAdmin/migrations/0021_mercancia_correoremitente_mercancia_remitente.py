# Generated by Django 4.1.7 on 2023-06-02 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModAdmin', '0020_remove_mercancia_camion_remove_mercancia_usuario_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mercancia',
            name='correoRemitente',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='remitente',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
