from django.urls import path
from ModAdmin import views

urlpatterns = [
    path('pais/', views.mostrarPais),
    path('crearPais/', views.crearPais),
    path('modificarPais/', views.modificarPais),
    path('eliminarPais/<id>', views.eliminarPais),
    path('departamento/', views.mostrarDepartamento),
    path('crearDepartamento/', views.crearDepartamento),
    path('modificarDepartamento/', views.modificarDepartamento),
    path('eliminarDepartamento/<id>', views.eliminarDepartamento),
    path('municipio/', views.mostrarMunicipio),
    path('crearMunicipio/', views.crearMunicipio),
    path('modificarMunicipio/', views.modificarMunicipio),
    path('eliminarMunicipio/<id>', views.eliminarMunicipio),
    path('rol/', views.mostrarRol),
    path('crearRol/', views.crearRol),
    path('modificarRol/', views.modificarRol),
    path('eliminarRol/<id>', views.eliminarRol),
    path('empresa/', views.mostrarEmpresa),
    path('crearEmpresa/', views.crearEmpresa),
    path('modificarEmpresa/', views.modificarEmpresa),
    path('eliminarEmpresa/<id>', views.eliminarEmpresa),
    path('sucursal/', views.mostrarSucursal),
    path('crearSucursal/', views.crearSucursal),
    path('modificarSucursal/', views.modificarSucursal),
    path('eliminarSucursal/<id>', views.eliminarSucursal),
    path('usuario/', views.mostrarUsuario),
    path('crearUsuario/', views.crearUsuario),
    path('modificarUsuario/', views.modificarUsuario),
    path('eliminarUsuario/<id>', views.eliminarUsuario)
]