from rest_framework import serializers
from ModAdmin.models import Pais, Departamento, Municipio, Empresa, Viaje, DetalleViaje, Usuario, Rol, Sucursal, \
    PuntoEntrega


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ('Id', 'Nombre')


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = ('Id', 'Nombre', 'Pais')


class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = ('Id', 'Nombre', 'Departamento')


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ('NIT', 'Nombre', 'Pais')


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ('Id', 'Nombre', 'Direccion', 'Empresa', 'Departamento', 'Municipio')


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('Id', 'Nombre')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('Cedula', 'Nombre', 'Apellido', 'Correo', 'Password', 'Sucursal', 'Rol')


class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = ('Id', 'Estado', 'Inicio', 'Llegada', 'Fecha', 'Placa_Camion', 'Usuario')


class PuntoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoEntrega
        fields = ('Id', 'Direccion', 'Nombre', 'Numero_Lote_Entrega', 'Estado', 'Viaje')


class DetalleViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleViaje
        fields = ('Id', 'Direccion', 'Fecha', 'Descanso', 'Viaje')
