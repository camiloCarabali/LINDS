from django.core.mail import send_mail
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from ModAdmin.models import Empresa, Sucursal, Usuario, Pais, Departamento, Municipio, Rol, Camion, PuntoEntrega, Viaje, \
    Mercancia
from ModAdmin.serializers import EmpresaSerializer, SucursalSerializer, UsuarioSerializer, PaisSerializer, \
    DepartamentoSerializer, MunicipioSerializer, RolSerializer, CamionSerializer, PuntoEntregaSerializer, \
    ViajeSerializer, MercanciaSerializer
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from LindsDjangoAPI import settings


# Create your views here.


@csrf_exempt
def mostrarPais(request):
    if request.method == 'GET':
        paises = Pais.objects.all()
        paises_serializers = PaisSerializer(paises, many=True)
        return JsonResponse(paises_serializers.data, safe=False)


@csrf_exempt
def crearPais(request):
    if request.method == 'POST':
        pais_data = JSONParser().parse(request)
        pais_serializers = PaisSerializer(data=pais_data)
        if pais_serializers.is_valid():
            pais_serializers.save()
            return JsonResponse("Pais añadido", safe=False)
        return JsonResponse("Fallo al añadir pais", safe=False)


@csrf_exempt
def modificarPais(request):
    if request.method == 'PUT':
        pais_data = JSONParser().parse(request)
        pais = Pais.objects.get(id=pais_data['id'])
        pais_serializers = PaisSerializer(pais, data=pais_data)
        if pais_serializers.is_valid():
            pais_serializers.save()
            return JsonResponse("Pais Modificado", safe=False)
        return JsonResponse("Fallo al modificar pais", safe=False)


@csrf_exempt
def eliminarPais(request, id=0):
    if request.method == 'DELETE':
        pais = Pais.objects.get(id=id)
        pais.delete()
        return JsonResponse("Pais Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""


def mostrarDepartamento(request):
    if request.method == 'GET':
        departamentos = Departamento.objects.all()
        departamentos_serializers = DepartamentoSerializer(departamentos, many=True)
        return JsonResponse(departamentos_serializers.data, safe=False)


@csrf_exempt
def crearDepartamento(request):
    if request.method == 'POST':
        departamento_data = JSONParser().parse(request)
        departamento_serializers = DepartamentoSerializer(data=departamento_data)
        if departamento_serializers.is_valid():
            departamento_serializers.save()
            return JsonResponse("Departamento añadido", safe=False)
        return JsonResponse("Fallo al añadir departamento", safe=False)


@csrf_exempt
def modificarDepartamento(request):
    if request.method == 'PUT':
        departamento_data = JSONParser().parse(request)
        departamento = Departamento.objects.get(id=departamento_data['id'])
        departamento_serializers = DepartamentoSerializer(departamento, data=departamento_data)
        if departamento_serializers.is_valid():
            departamento_serializers.save()
            return JsonResponse("Departamento Modificado", safe=False)
        return JsonResponse("Fallo al modificar departamento", safe=False)


@csrf_exempt
def eliminarDepartamento(request, id=0):
    if request.method == 'DELETE':
        departamento = Departamento.objects.get(id=id)
        departamento.delete()
        return JsonResponse("Departamento Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarMunicipio(request):
    if request.method == 'GET':
        municipios = Municipio.objects.all()
        municipios_serializers = MunicipioSerializer(municipios, many=True)
        return JsonResponse(municipios_serializers.data, safe=False)


@csrf_exempt
def crearMunicipio(request):
    if request.method == 'POST':
        municipio_data = JSONParser().parse(request)
        municipio_serializers = MunicipioSerializer(data=municipio_data)
        if municipio_serializers.is_valid():
            municipio_serializers.save()
            return JsonResponse("Municipio añadido", safe=False)
        return JsonResponse("Fallo al añadir municipio", safe=False)


@csrf_exempt
def modificarMunicipio(request):
    if request.method == 'PUT':
        municipio_data = JSONParser().parse(request)
        municipio = Municipio.objects.get(id=municipio_data['id'])
        municipio_serializers = MunicipioSerializer(municipio, data=municipio_data)
        if municipio_serializers.is_valid():
            municipio_serializers.save()
            return JsonResponse("Municipio Modificado", safe=False)
        return JsonResponse("Fallo al modificar municipio", safe=False)


@csrf_exempt
def eliminarMunicipio(request, id=0):
    if request.method == 'DELETE':
        municipio = Municipio.objects.get(id=id)
        municipio.delete()
        return JsonResponse("Municipio Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarRol(request):
    if request.method == 'GET':
        roles = Rol.objects.all()
        roles_serializers = RolSerializer(roles, many=True)
        return JsonResponse(roles_serializers.data, safe=False)


@csrf_exempt
def crearRol(request):
    if request.method == 'POST':
        rol_data = JSONParser().parse(request)
        rol_serializers = RolSerializer(data=rol_data)
        if rol_serializers.is_valid():
            rol_serializers.save()
            return JsonResponse("rol añadido", safe=False)
        return JsonResponse("Fallo al añadir rol", safe=False)


@csrf_exempt
def modificarRol(request):
    if request.method == 'PUT':
        rol_data = JSONParser().parse(request)
        rol = Rol.objects.get(id=rol_data['id'])
        rol_serializers = RolSerializer(rol, data=rol_data)
        if rol_serializers.is_valid():
            rol_serializers.save()
            return JsonResponse("Rol Modificado", safe=False)
        return JsonResponse("Fallo al modificar rol", safe=False)


@csrf_exempt
def eliminarRol(request, id=0):
    if request.method == 'DELETE':
        rol = Rol.objects.get(id=id)
        rol.delete()
        return JsonResponse("Rol Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarEmpresa(request):
    if request.method == 'GET':
        empresas = Empresa.objects.all()
        empresas_serializers = EmpresaSerializer(empresas, many=True)
        return JsonResponse(empresas_serializers.data, safe=False)


@csrf_exempt
def crearEmpresa(request):
    if request.method == 'POST':
        empresa_data = JSONParser().parse(request)
        empresa_serializers = EmpresaSerializer(data=empresa_data)
        if empresa_serializers.is_valid():
            empresa_serializers.save()
            return JsonResponse("Empresa añadida", safe=False)
        return JsonResponse("Fallo al añadir empresa", safe=False)


@csrf_exempt
def modificarEmpresa(request):
    if request.method == 'PUT':
        empresa_data = JSONParser().parse(request)
        empresa = Empresa.objects.get(NIT=empresa_data['NIT'])
        empresa_serializers = EmpresaSerializer(empresa, data=empresa_data)
        if empresa_serializers.is_valid():
            empresa_serializers.save()
            return JsonResponse("Empresa Modificada", safe=False)
        return JsonResponse("Fallo al modificar empresa", safe=False)


@csrf_exempt
def inactivarEmpresa(request, NIT):
    if request.method == 'PUT':
        empresa = Empresa.objects.get(NIT=NIT)
        empresa.estado = False
        empresa.save()
        return JsonResponse("Empresa Inactivada", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarSucursal(request):
    if request.method == 'GET':
        sucursales = Sucursal.objects.all()
        sucursales_serializers = SucursalSerializer(sucursales, many=True)
        return JsonResponse(sucursales_serializers.data, safe=False)


@csrf_exempt
def crearSucursal(request):
    if request.method == 'POST':
        sucursal_data = JSONParser().parse(request)
        sucursal_serializers = SucursalSerializer(data=sucursal_data)
        if sucursal_serializers.is_valid():
            sucursal_serializers.save()
            return JsonResponse("Sucursal añadida", safe=False)
        return JsonResponse("Fallo al añadir sucursal", safe=False)


@csrf_exempt
def modificarSucursal(request):
    if request.method == 'PUT':
        sucursal_data = JSONParser().parse(request)
        sucursal = Sucursal.objects.get(id=sucursal_data['id'])
        sucursal_serializers = SucursalSerializer(sucursal, data=sucursal_data)
        if sucursal_serializers.is_valid():
            sucursal_serializers.save()
            return JsonResponse("Sucursal Modificada", safe=False)
        return JsonResponse("Fallo al modificar sucursal", safe=False)


@csrf_exempt
def inactivarSucursal(request, id=0):
    if request.method == 'PUT':
        sucursal = Sucursal.objects.get(id=id)
        sucursal.estado = False
        sucursal.save()
        return JsonResponse("Sucursal Inactivada", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarUsuario(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        usuarios_serializers = UsuarioSerializer(usuarios, many=True)
        return JsonResponse(usuarios_serializers.data, safe=False)


@csrf_exempt
def crearUsuario(request):
    if request.method == 'POST':
        usuario_data = JSONParser().parse(request)
        usuario_serializers = UsuarioSerializer(data=usuario_data)
        if usuario_serializers.is_valid():
            usuario_serializers.save()
            return JsonResponse("Usuario añadido", safe=False)
        return JsonResponse("Fallo al añadir usuario", safe=False)


@csrf_exempt
def modificarUsuario(request):
    if request.method == 'PUT':
        usuario_data = JSONParser().parse(request)
        usuario = Usuario.objects.get(cedula=usuario_data['cedula'])
        usuario_serializers = UsuarioSerializer(usuario, data=usuario_data)
        if usuario_serializers.is_valid():
            usuario_serializers.save()
            return JsonResponse("Usuario Modificado", safe=False)
        return JsonResponse("Fallo al modificar usuario", safe=False)


@csrf_exempt
def inactivarUsuario(request, cedula):
    if request.method == 'PUT':
        usuario = Usuario.objects.get(cedula=cedula)
        usuario.estado = False
        usuario.save()
        return JsonResponse("Usuario Inactivado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarCamion(request):
    if request.method == 'GET':
        camiones = Camion.objects.all()
        camiones_serializers = CamionSerializer(camiones, many=True)
        return JsonResponse(camiones_serializers.data, safe=False)


def buscarCamion(request, sucursal):
    if request.method == 'GET':
        camiones = Camion.objects.filter(sucursal=sucursal)
        camiones_serializers = CamionSerializer(camiones, many=True)
        return JsonResponse(camiones_serializers.data, safe=False)


@csrf_exempt
def crearCamion(request):
    if request.method == 'POST':
        camion_data = JSONParser().parse(request)
        camion_serializers = CamionSerializer(data=camion_data)
        if camion_serializers.is_valid():
            camion_serializers.save()
            return JsonResponse("Camion añadido", safe=False)
        return JsonResponse("Fallo al añadir camion", safe=False)


@csrf_exempt
def modificarCamion(request):
    if request.method == 'PUT':
        camion_data = JSONParser().parse(request)
        camion = Camion.objects.get(matricula=camion_data['matricula'])
        camion_serializers = CamionSerializer(camion, data=camion_data)
        if camion_serializers.is_valid():
            camion_serializers.save()
            return JsonResponse("Camion Modificado", safe=False)
        return JsonResponse("Fallo al modificar camion", safe=False)


@csrf_exempt
def eliminarCamion(request, matricula):
    if request.method == 'DELETE':
        camion = Camion.objects.get(matricula=matricula)
        camion.delete()
        return JsonResponse("Camion Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarPuntoEntrega(request):
    if request.method == 'GET':
        puntos_entregas = PuntoEntrega.objects.all()
        puntos_entregas_serializers = PuntoEntregaSerializer(puntos_entregas, many=True)
        return JsonResponse(puntos_entregas_serializers.data, safe=False)


@csrf_exempt
def crearPuntoEntrega(request):
    if request.method == 'POST':
        punto_entrega_data = JSONParser().parse(request)
        punto_entrega_serializers = PuntoEntregaSerializer(data=punto_entrega_data)
        if punto_entrega_serializers.is_valid():
            punto_entrega_serializers.save()
            return JsonResponse("Punto de entrega añadido", safe=False)
        return JsonResponse("Fallo al añadir punto de entrega", safe=False)


@csrf_exempt
def modificarPuntoEntrega(request):
    if request.method == 'PUT':
        punto_entrega_data = JSONParser().parse(request)
        punto_entrega = PuntoEntrega.objects.get(id=punto_entrega_data['id'])
        punto_entrega_serializers = PuntoEntregaSerializer(punto_entrega, data=punto_entrega_data)
        if punto_entrega_serializers.is_valid():
            punto_entrega_serializers.save()
            return JsonResponse("Punto de entrega modificado", safe=False)
        return JsonResponse("Fallo al modificar punto de entrega", safe=False)


@csrf_exempt
def eliminarPuntoEntrega(request, id):
    if request.method == 'DELETE':
        punto_entrega = PuntoEntrega.objects.get(id=id)
        punto_entrega.delete()
        return JsonResponse("Punto de entrega eliminado", safe=False)


def waypoints(request, viaje):
    if request.method == 'GET':
        waypoints = []
        entregas = PuntoEntrega.objects.filter(viaje=viaje)
        for n in range(len(entregas)):
            waypoints.append(entregas[n].direccion)
        return JsonResponse(waypoints, safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def mostrarViaje(request):
    if request.method == 'GET':
        viajes = Viaje.objects.all()
        viajes_serializers = ViajeSerializer(viajes, many=True)
        return JsonResponse(viajes_serializers.data, safe=False)


@csrf_exempt
def crearViaje(request):
    if request.method == 'POST':
        viaje_data = JSONParser().parse(request)
        viaje_serializers = ViajeSerializer(data=viaje_data)
        if viaje_serializers.is_valid():
            viaje_serializers.save()
            return JsonResponse("Viaje asignado", safe=False)
        return JsonResponse("Fallo al asignar un viaje", safe=False)


@csrf_exempt
def modificarViaje(request):
    if request.method == 'PUT':
        viaje_data = JSONParser().parse(request)
        viaje = Viaje.objects.get(id=viaje_data['id'])
        viaje_serializers = ViajeSerializer(viaje, data=viaje_data)
        if viaje_serializers.is_valid():
            viaje_serializers.save()
            return JsonResponse("Viaje modificado", safe=False)
        return JsonResponse("Fallo al modificar viaje", safe=False)


@csrf_exempt
def inactivarViaje(request, id):
    if request.method == 'PUT':
        viaje = Viaje.objects.get(id=id)
        viaje.estado = False
        viaje.save()
        return JsonResponse("Viaje Inactivado", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def buscarEmpresa(request, NIT):
    empresa = Empresa.objects.get(NIT=NIT)
    nombre = empresa.nombre
    response_data = {'nombre': nombre}
    return JsonResponse(response_data)


@csrf_exempt
def buscarMunicipio(request, departamento):
    if request.method == 'GET':
        municipios = Municipio.objects.filter(departamento=departamento)
        municipios_serializers = MunicipioSerializer(municipios, many=True)
        return JsonResponse(municipios_serializers.data, safe=False)


@csrf_exempt
def buscarSucursal(request, empresa):
    if request.method == 'GET':
        sucursales = Sucursal.objects.filter(empresa=empresa)
        sucursales_serializers = SucursalSerializer(sucursales, many=True)
        return JsonResponse(sucursales_serializers.data, safe=False)


@csrf_exempt
def buscarConductor(request):
    if request.method == 'GET':
        conductores = Usuario.objects.filter(rol="Conductor")
        conductores_serializers = UsuarioSerializer(conductores, many=True)
        return JsonResponse(conductores_serializers.data, safe=False)


@csrf_exempt
def buscarPeso(request, matricula):
    if request.method == 'GET':
        camion = Camion.objects.get(matricula=matricula)
        capacidad = camion.capacidad
        response_data = {'capacidad': capacidad}
        return JsonResponse(response_data)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def buscarMercancia(request, id):
    mercancia = Mercancia.objects.get(id=id)
    mercancia_serializers = MercanciaSerializer(mercancia, many=True)
    return JsonResponse(mercancia_serializers.data, safe=False)


@csrf_exempt
def mostrarMercancia(request):
    if request.method == 'GET':
        mercancias = Mercancia.objects.all()
        mercancias_serializers = MercanciaSerializer(mercancias, many=True)
        return JsonResponse(mercancias_serializers.data, safe=False)


@csrf_exempt
def crearMercancia(request):
    if request.method == 'POST':
        mercancia_data = JSONParser().parse(request)
        mercancia_serializers = MercanciaSerializer(data=mercancia_data)
        if mercancia_serializers.is_valid():
            mercancia_serializers.save()
            return JsonResponse("Mercancia asignada", safe=False)
        return JsonResponse("Fallo al asignar una mercancia", safe=False)


@csrf_exempt
def modificarMercancia(request):
    if request.method == 'PUT':
        mercancia_data = JSONParser().parse(request)
        mercancia = Mercancia.objects.get(id=mercancia_data['id'])
        mercancia_serializers = MercanciaSerializer(mercancia, data=mercancia_data)
        if mercancia_serializers.is_valid():
            mercancia_serializers.save()
            return JsonResponse("Mercancia modificada", safe=False)
        return JsonResponse("Fallo al modificar Mercancia", safe=False)


@csrf_exempt
def eliminarMercancia(request, id):
    if request.method == 'DELETE':
        mercancia = Mercancia.objects.get(id=id)
        mercancia.delete()
        return JsonResponse("Mercancia Eliminada", safe=False)


"""
/---------------------------------------------------------------/
"""


@csrf_exempt
def correo(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        correo = data['correo']
        password = data['password']
        subject = "BIENVENIDO A LINDS"
        message = "Bienvenido a la beta de la herramienta prototipo LINDS, sus credenciales son las siguientes:\n" \
                  "Correo: " + correo + "\n" \
                                        "Contraseña: " + password + "\n" \
                                                                    "Cualquier inconveniente con la herramienta por favor comunicarse al correo " + settings.EMAIL_HOST_USER
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [correo]
        send_mail(subject, message, email_from, recipient_list)
        return JsonResponse("Correo enviado", safe=False)


class registro(APIView):
    def post(self, request):
        usuario_data = JSONParser().parse(request)
        registro_serializers = UsuarioSerializer(data=usuario_data)
        registro_serializers.is_valid(raise_exception=True)
        registro_serializers.save()
        return Response(registro_serializers.data, status=status.HTTP_200_OK)


class login(APIView):
    def post(self, request):
        correo = request.data['correo']
        password = request.data['password']
        user = Usuario.objects.filter(correo=correo).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'cedula': user.cedula,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class usuario(APIView):
    def get(self, request, token):
        # token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = Usuario.objects.filter(cedula=payload['cedula']).first()
        serializer = UsuarioSerializer(user)
        return Response(serializer.data)


class logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
