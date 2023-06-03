from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Pais(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, default='Colombia', null=False)

    class Meta:
        db_table = 'pais'


class Departamento(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    pais = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'departamento'


class Municipio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    departamento = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'municipio'


class Empresa(models.Model):
    NIT = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    pais = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'empresa'


class Sucursal(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False, unique=True)
    direccion = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    empresa = models.CharField(max_length=100, null=False)
    departamento = models.CharField(max_length=100, null=False)
    municipio = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'sucursal'


class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'rol'


class Estado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'estado'


class Usuario(AbstractUser):
    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    apellido = models.CharField(max_length=100, null=False)
    correo = models.CharField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    disponibilidad = models.CharField(max_length=100, null=True)
    empresa = models.CharField(max_length=100, null=True)
    sucursal = models.CharField(max_length=100, null=True)
    rol = models.CharField(max_length=100, null=False)
    username = None

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'usuario'


class Camion(models.Model):
    matricula = models.CharField(primary_key=True, max_length=6)
    modelo = models.CharField(max_length=100, null=False)
    tipo = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    capacidad = models.IntegerField(null=False)
    empresa = models.CharField(max_length=100, null=False)
    sucursal = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)

    class Meta:
        db_table = 'camion'


class Viaje(models.Model):
    id = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=100, null=False)
    fecha = models.DateTimeField()
    camion = models.CharField(max_length=100, null=False)
    usuario = models.CharField(max_length=100, null=False)
    empresa = models.CharField(max_length=100, null=False)
    sucursal = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'viaje'


class PuntoEntrega(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100, null=False)
    empresa = models.CharField(max_length=100, null=False)
    sucursal = models.CharField(max_length=100, null=False)
    estado = models.BooleanField(default=True, null=False)
    viaje = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'puntoEntrega'


class Mercancia(models.Model):
    id = models.AutoField(primary_key=True)
    puntoInicio = models.CharField(max_length=100, null=False)
    nombre = models.CharField(max_length=100, null=False)
    peso = models.IntegerField(null=False)
    altura = models.FloatField(null=False)
    ancho = models.FloatField(null=False)
    largo = models.FloatField(null=False)
    volumen = models.FloatField(null=False)
    puntoEntrega = models.CharField(max_length=100, null=False)
    remitente = models.CharField(max_length=100, null=False)
    correoRemitente = models.CharField(max_length=100, null=False)
    telefonoRemitente = models.CharField(max_length=100, null=False)
    destinatario = models.CharField(max_length=100, null=False)
    correoDestinatario = models.CharField(max_length=100, null=False)
    telefonoDestinatario = models.CharField(max_length=100, null=False)
    estado = models.CharField(max_length=100, null=False)
    carga = models.BooleanField(default=False, null=False)
    fechaCarga = models.DateTimeField(null=True)
    descarga = models.BooleanField(default=False, null=False)
    fechaDescarga = models.DateTimeField(null=True)
    empresa = models.CharField(max_length=100, null=False)
    sucursal = models.CharField(max_length=100, null=False)
    viaje = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'mercancia'


class DetalleViaje(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=100)
    fecha = models.DateTimeField()
    descripcion = models.CharField(max_length=500, null=False)
    descanso = models.BooleanField(default=False, null=False)
    viaje = models.CharField(max_length=500, null=False)

    class Meta:
        db_table = 'detalleViaje'
