# Generated by Django 4.1.7 on 2023-05-31 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModAdmin', '0015_viaje_empresa_viaje_sucursal'),
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
            name='puntoInicio',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='remitente',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='usuario',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
