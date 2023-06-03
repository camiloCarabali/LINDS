from rest_framework import serializers
from ModAdmin.models import Pais, Departamento, Municipio, Empresa, Viaje, DetalleViaje, Usuario, Rol, Sucursal, \
    PuntoEntrega, Camion, Mercancia, Estado


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
        fields = ('id', 'nombre', 'direccion', 'estado', 'empresa', 'departamento', 'municipio')


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('id', 'nombre')


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'nombre')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('cedula', 'nombre', 'apellido', 'correo', 'password', 'estado', 'disponibilidad', 'empresa', 'sucursal', 'rol')

        # extra_kwargs = {
        #     'password': {'write_only': True}
        # }

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
        fields = ('id', 'estado', 'fecha', 'camion', 'usuario', 'empresa', 'sucursal')


class PuntoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoEntrega
        fields = ('id', 'direccion', 'estado', 'viaje', 'empresa', 'sucursal')


class MercanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mercancia
        fields = (
            'id', 'puntoInicio', 'nombre', 'peso', 'puntoEntrega', 'destinatario', 'correoDestinatario',
            'telefonoDestinatario', 'estado', 'carga', 'fechaCarga', 'descarga', 'fechaDescarga', 'empresa', 'sucursal', 'viaje', 'altura', 'ancho',
            'largo', 'volumen', 'remitente', 'correoRemitente', 'telefonoRemitente')


class DetalleViajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleViaje
        fields = ('id', 'direccion', 'fecha', 'descanso', 'descripcion', 'viaje')


class CamionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camion
        fields = ('matricula', 'modelo', 'tipo', 'color', 'capacidad', 'empresa', 'sucursal', 'estado')
