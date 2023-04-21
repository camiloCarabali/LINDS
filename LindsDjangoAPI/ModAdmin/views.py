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
        if pais_serializers.is_val():
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
        empresa = Empresa.objects.get(id=empresa_data['id'])
        empresa_serializers = EmpresaSerializer(empresa, data=empresa_data)
        if empresa_serializers.is_valid():
            empresa_serializers.save()
            return JsonResponse("Empresa Modificada", safe=False)
        return JsonResponse("Fallo al modificar empresa", safe=False)


@csrf_exempt
def eliminarEmpresa(request, id=0):
    if request.method == 'DELETE':
        empresa = Empresa.objects.get(id=id)
        empresa.delete()
        return JsonResponse("Empresa Eliminada", safe=False)


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
def eliminarSucursal(request, id=0):
    if request.method == 'DELETE':
        sucursal = Sucursal.objects.get(id=id)
        sucursal.delete()
        return JsonResponse("Sucursal Eliminada", safe=False)



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
        ussuario_serializers = UsuarioSerializer(data=usuario_data)
        if ussuario_serializers.is_valid():
            ussuario_serializers.save()
            return JsonResponse("Usuario añadido", safe=False)
        return JsonResponse("Fallo al añadir usuario", safe=False)


@csrf_exempt
def modificarUsuario(request):
    if request.method == 'PUT':
        usuario_data = JSONParser().parse(request)
        usuario = Usuario.objects.get(id=usuario_data['id'])
        usuario_serializers = UsuarioSerializer(usuario, data=usuario_data)
        if usuario_serializers.is_valid():
            usuario_serializers.save()
            return JsonResponse("Usuario Modificado", safe=False)
        return JsonResponse("Fallo al modificar usuario", safe=False)


@csrf_exempt
def eliminarUsuario(request, id=0):
    if request.method == 'DELETE':
        usuario = Usuario.objects.get(id=id)
        usuario.delete()
        return JsonResponse("Usuario Eliminado", safe=False)