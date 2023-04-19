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
        departamento_serializers = PaisSerializer(departamento, data=departamento_data)
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