from rest_framework import serializers
from ModAdmin.models import Pais, Departamento, Municipio, Empresa, Viaje, DetalleViaje, Usuario, Rol, Sucursal, \
    PuntoEntrega, Camion


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ('id', 'nombre')


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = ('id', 'nombre', 'pais')


class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = ('id', 'nombre', 'departamento')


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ('NIT', 'nombre', 'estado', 'pais')


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ('id', 'nombre', 'direccion', 'estado', 'empresa', 'municipio')


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('id', 'nombre')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('cedula', 'nombre', 'apellido', 'correo', 'password', 'estado', 'sucursal', 'rol')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaje
        fields = ('id', 'estado', 'inicio', 'llegada', 'fecha', 'camion', 'usuario')


class PuntoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoEntrega
        fields = ('id', 'direccion', 'nombre', 'numero_lote_entrega', 'estado', 'viaje')


class DetalleViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleViaje
        fields = ('id', 'direccion', 'fecha', 'descanso', 'descripcion', 'viaje')


class CamionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camion
        fields = ('matricula', 'modelo', 'tipo', 'color', 'almacenamiento')