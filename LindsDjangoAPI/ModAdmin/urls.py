from django.urls import path
from ModAdmin import views

urlpatterns = [
    path('pais/', views.mostrarPais),
    path('crearPais/', views.crearPais),
    path('modificarPais/', views.modificarPais),
    path('eliminarPais/<id>', views.eliminarPais)
]