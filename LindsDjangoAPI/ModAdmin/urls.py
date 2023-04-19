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
]