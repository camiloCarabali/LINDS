from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from ModAdmin.models import Empresa, Sucursal, Usuario, Pais, Departamento, Municipio, Rol
from ModAdmin.serializers import EmpresaSerializer, SucursalSerializer, UsuarioSerializer, PaisSerializer, \
    DepartamentoSerializer, MunicipioSerializer, RolSerializer
from django.http.response import JsonResponse


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
        pais = Pais.objects.get(Id=pais_data['Id'])
        pais_serializers = PaisSerializer(pais, data=pais_data)
        if pais_serializers.is_valid():
            pais_serializers.save()
            return JsonResponse("Pais Modificado", safe=False)
        return JsonResponse("Fallo al modificar pais", safe=False)


@csrf_exempt
def eliminarPais(request, id=0):
    if request.method == 'DELETE':
        pais = Pais.objects.get(Id=id)
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
        departamento = Departamento.objects.get(Id=departamento_data['Id'])
        departamento_serializers = DepartamentoSerializer(departamento, data=departamento_data)
        if departamento_serializers.is_valid():
            departamento_serializers.save()
            return JsonResponse("Departamento Modificado", safe=False)
        return JsonResponse("Fallo al modificar departamento", safe=False)


@csrf_exempt
def eliminarDepartamento(request, id=0):
    if request.method == 'DELETE':
        departamento = Departamento.objects.get(Id=id)
        departamento.delete()
        return JsonResponse("Departamento Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""

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
        municipio = Municipio.objects.get(Id=municipio_data['Id'])
        municipio_serializers = MunicipioSerializer(municipio, data=municipio_data)
        if municipio_serializers.is_valid():
            municipio_serializers.save()
            return JsonResponse("Municipio Modificado", safe=False)
        return JsonResponse("Fallo al modificar municipio", safe=False)


@csrf_exempt
def eliminarMunicipio(request, id=0):
    if request.method == 'DELETE':
        municipio = Municipio.objects.get(Id=id)
        municipio.delete()
        return JsonResponse("Municipio Eliminado", safe=False)


"""
/---------------------------------------------------------------/
"""

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
        rol = Rol.objects.get(Id=rol_data['Id'])
        rol_serializers = RolSerializer(rol, data=rol_data)
        if rol_serializers.is_valid():
            rol_serializers.save()
            return JsonResponse("Rol Modificado", safe=False)
        return JsonResponse("Fallo al modificar rol", safe=False)


@csrf_exempt
def eliminarRol(request, id=0):
    if request.method == 'DELETE':
        rol = Rol.objects.get(Id=id)
        rol.delete()
        return JsonResponse("Rol Eliminado", safe=False)