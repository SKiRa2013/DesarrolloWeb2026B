from django.urls import path
from infraestructura.views import lista_servidores, detalle_servidor

urlpatterns = [
    path('', lista_servidores, name='home_servidores'),
    path('servidor/<int:pkey>/', detalle_servidor, name='detalle_servidor'),
]
