from django.urls import path
from infraestructura.views import crear_servidor, lista_servidores, lista_auditorias, detalle_servidor, editar_servidor, eliminar_servidor

urlpatterns = [
    path('auditorias', lista_auditorias, name="lista_auditorias"),
    path('', lista_servidores, name='home_servidores'),
    path('servidor/<int:pk>/', detalle_servidor, name='detalle_servidor'),
    path('servidor/new/', crear_servidor, name='crear_servidor'),
    path('servidor/<int:pk>/edit', editar_servidor, name='editar_servidor'),
    path('servidor/<int:pk>/delete', eliminar_servidor, name='eliminar_servidor'),
]
