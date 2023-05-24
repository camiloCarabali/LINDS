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
    path('inactivarEmpresa/<NIT>', views.inactivarEmpresa),
    path('sucursal/', views.mostrarSucursal),
    path('crearSucursal/', views.crearSucursal),
    path('modificarSucursal/', views.modificarSucursal),
    path('inactivarSucursal/<id>', views.inactivarSucursal),
    path('usuario/', views.mostrarUsuario),
    path('crearUsuario/', views.crearUsuario),
    path('modificarUsuario/', views.modificarUsuario),
    path('inactivarUsuario/<cedula>', views.inactivarUsuario),
    path('buscarEmpresa/<NIT>', views.buscarEmpresa),
    path('buscarMunicipio/<departamento>', views.buscarMunicipio),
    path('buscarSucursal/<empresa>', views.buscarSucursal),
    path('buscarConductor/', views.buscarConductor),
    path('buscarPeso/<matricula>', views.buscarPeso),
    path('camion/', views.mostrarCamion),
    path('buscarCamion/<sucursal>', views.buscarCamion),
    path('crearCamion/', views.crearCamion),
    path('modificarCamion/', views.modificarCamion),
    path('eliminarCamion/<matricula>', views.eliminarCamion),
    path('puntoEntrega/', views.mostrarPuntoEntrega),
    path('crearPuntoEntrega/', views.crearPuntoEntrega),
    path('buscarPuntoEntrega/<viaje>', views.buscarPuntoEntrega),
    path('modificarPuntoEntrega/', views.modificarPuntoEntrega),
    path('eliminarPuntoEntrega/', views.eliminarPuntoEntrega),
    path('waypoints/<viaje>', views.waypoints),
    path('viaje/', views.mostrarViaje),
    path('crearViaje/', views.crearViaje),
    path('modificarViaje/', views.modificarViaje),
    path('inactivarViaje/', views.inactivarViaje),
    path('confirmarViaje/<id>', views.confirmarViaje),
    path('mercancia/', views.mostrarMercancia),
    path('crearMercancia/', views.crearMercancia),
    path('buscarMercancia/<puntoEntrega>', views.buscarMercancia),
    path('modificarMercancia/', views.modificarMercancia),
    path('cargaMercancia/<id>', views.cargaMercancia),
    path('descargaMercancia/<id>', views.descargaMercancia),
    path('eliminarMercancia/', views.eliminarMercancia),
    path('historialViaje/<usuario>', views.historialViaje),
    path('asignacionViaje/<usuario>', views.asignacionViaje),
    path('correo/', views.correo),
    path('registro', views.registro.as_view()),
    path('login', views.login.as_view()),
    path('user/<token>', views.usuario.as_view()),
    path('logout', views.logout.as_view())
]