from django.db import models


# Create your models here.
class Pais(models.Model):
    Id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=100, default='Colombia')

    class Meta:
        db_table = 'pais'


class Departamento(models.Model):
    Id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    class Meta:
        db_table = 'departamento'


class Municipio(models.Model):
    Id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    class Meta:
        db_table = 'municipio'


class Empresa(models.Model):
    NIT = models.IntegerField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    class Meta:
        db_table = 'empresa'


class Sucursal(models.Model):
    Id = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Direccion = models.CharField(max_length=100)
    Empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    Departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    Municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    class Meta:
        db_table = 'sucursal'


class Rol(models.Model):
    Id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        db_table = 'rol'


class Usuario(models.Model):
    Cedula = models.IntegerField(primary_key=True)
    Nombre = models.CharField(max_length=100)
    Apellido = models.CharField(max_length=100)
    Correo = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    Sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    Rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    class Meta:
        db_table = 'usuario'


class Viaje(models.Model):
    Id = models.AutoField(primary_key=True)
    Estado = models.BooleanField(default=False)
    Inicio = models.CharField(max_length=100)
    Llegada = models.CharField(max_length=100)
    Fecha = models.DateTimeField()
    Placa_Camion = models.CharField(max_length=6)
    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    class Meta:
        db_table = 'viaje'


class PuntoEntrega(models.Model):
    Id = models.AutoField(primary_key=True)
    Direccion = models.CharField(max_length=100)
    Nombre = models.CharField(max_length=100)
    Numero_Lote_Entrega = models.IntegerField()
    Estado = models.BooleanField(default=False)
    Viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)

    class Meta:
        db_table = 'puntoEntrega'


class DetalleViaje(models.Model):
    Id = models.AutoField(primary_key=True)
    Direccion = models.CharField(max_length=100)
    Fecha = models.DateTimeField()
    Descanso = models.BooleanField(default=False)
    Viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)

    class Meta:
        db_table = 'detalleViaje'
