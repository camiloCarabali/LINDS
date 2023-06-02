# Generated by Django 4.1.7 on 2023-06-02 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModAdmin', '0021_mercancia_correoremitente_mercancia_remitente'),
    ]

    operations = [
        migrations.AddField(
            model_name='mercancia',
            name='altura',
            field=models.FloatField(default='0'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='ancho',
            field=models.FloatField(default='0'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='largo',
            field=models.FloatField(default='0'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mercancia',
            name='volumen',
            field=models.FloatField(default='0'),
            preserve_default=False,
        ),
    ]
