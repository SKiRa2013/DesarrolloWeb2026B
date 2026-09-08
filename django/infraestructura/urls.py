from django.urls import path
from infraestructura.views import (
    crear_servidor, lista_servidores, detalle_servidor, editar_servidor, eliminar_servidor,
    lista_auditorias,
    crear_incidencia, detalle_incidencia, editar_incidencia, eliminar_incidencia
)

urlpatterns = [
    path('auditorias', lista_auditorias, name="lista_auditorias"),
    path('', lista_servidores, name='home_servidores'),
    path('servidor/<int:pk>/', detalle_servidor, name='detalle_servidor'),
    path('servidor/new/', crear_servidor, name='crear_servidor'),
    path('servidor/<int:pk>/edit', editar_servidor, name='editar_servidor'),
    path('servidor/<int:pk>/delete', eliminar_servidor, name='eliminar_servidor'),
    path('servidor/<int:pk>/incident/new', crear_incidencia, name='crear_incidencia'),
    path('servidor/<int:pk>/incident/<int:inc_pk>/edit', editar_incidencia, name='editar_incidencia'),
    path('servidor/<int:pk>/incident/<int:inc_pk>/delete', eliminar_incidencia, name='eliminar_incidencia'),
    path('servidor/<int:pk>/incident/<int:inc_pk>', detalle_incidencia, name='detalle_incidencia'),
]
