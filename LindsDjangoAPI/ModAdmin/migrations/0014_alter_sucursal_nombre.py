# Generated by Django 4.1.7 on 2023-05-27 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModAdmin', '0013_mercancia_empresa_mercancia_sucursal_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sucursal',
            name='nombre',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
