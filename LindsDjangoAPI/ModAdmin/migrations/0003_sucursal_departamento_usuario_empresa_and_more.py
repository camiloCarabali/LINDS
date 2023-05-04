from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ModAdmin', '0002_rename_almacenamiento_camion_capacidad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='sucursal',
            name='departamento',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usuario',
            name='empresa',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='nombre',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]