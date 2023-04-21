from django.db import models


# Create your models here.
class Pais(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, default='Colombia',  null=False)

    class Meta:
        db_table = 'pais'


class Departamento(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    class Meta:
        db_table = 'departamento'


class Municipio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100,  null=False)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    class Meta:
        db_table = 'municipio'


class Empresa(models.Model):
    NIT = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100,  null=False)
    estado = models.BooleanField(default=True,  null=False)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    class Meta:
        db_table = 'empresa'


class Sucursal(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    direccion = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    class Meta:
        db_table = 'sucursal'


class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'rol'


class Usuario(models.Model):
    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    apellido = models.CharField(max_length=100, null=False)
    correo = models.CharField(max_length=100, null=False)
    password = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    class Meta:
        db_table = 'usuario'


class Camion(models.Model):
    matricula = models.CharField(primary_key=True, max_length=6)
    modelo = models.CharField(max_length=100, null=False)
    tipo = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    almacenamiento = models.IntegerField(null=False)

    class Meta:
        db_table = 'camion'


class Viaje(models.Model):
    id = models.AutoField(primary_key=True)
    estado = models.BooleanField(default=False, null=False)
    inicio = models.CharField(max_length=100, null=False)
    llegada = models.CharField(max_length=100, null=False)
    fecha = models.DateTimeField()
    camion = models.ForeignKey(Camion, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    class Meta:
        db_table = 'viaje'


class PuntoEntrega(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100, null=False)
    nombre = models.CharField(max_length=100, null=False)
    numero_lote_entrega = models.IntegerField(null=False)
    estado = models.BooleanField(default=False, null=False)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)

    class Meta:
        db_table = 'puntoEntrega'


class DetalleViaje(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100)
    fecha = models.DateTimeField()
    descripcion = models.CharField(max_length=500, null=False)
    descanso = models.BooleanField(default=False, null=False)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)

    class Meta:
        db_table = 'detalleViaje'