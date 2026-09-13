from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from infraestructura.views import (
    crear_servidor, lista_servidores, detalle_servidor, editar_servidor, eliminar_servidor,
    lista_auditorias,
    crear_incidencia, detalle_incidencia, editar_incidencia, eliminar_incidencia,
    MantenimientoListView, MantenimientoDetailView, MantenimientoCreateView, MantenimientoUpdateView, MantenimientoDeleteView
)

from infraestructura.api import NodoServidorViewSet, IncidenciaServidorViewSet

router = DefaultRouter()
router.register(r'servidores', NodoServidorViewSet, basename='api-servidor')
router.register(r'incidencias', IncidenciaServidorViewSet, basename='api-incidencia')

urlpatterns = [
    path('audits', lista_auditorias, name="lista_auditorias"),
    path('', lista_servidores, name='home_servidores'),
    path('server/<int:pk>/', detalle_servidor, name='detalle_servidor'),
    path('server/new/', crear_servidor, name='crear_servidor'),
    path('server/<int:pk>/edit', editar_servidor, name='editar_servidor'),
    path('server/<int:pk>/delete', eliminar_servidor, name='eliminar_servidor'),
    path('server/<int:pk>/incident/new', crear_incidencia, name='crear_incidencia'),
    path('server/<int:pk>/incident/<int:inc_pk>/edit', editar_incidencia, name='editar_incidencia'),
    path('server/<int:pk>/incident/<int:inc_pk>/delete', eliminar_incidencia, name='eliminar_incidencia'),
    path('server/<int:pk>/incident/<int:inc_pk>', detalle_incidencia, name='detalle_incidencia'),

    path('api/', include(router.urls)),
    path('api/servidores/<int:servidor_pk>/incidencias/',
        IncidenciaServidorViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='api-servidor-incidencias'
    ),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]


urlpatterns += [
    path('mantenimientos/', MantenimientoListView.as_view(), name='lista_mantenimientos'),
    path('mantenimientos/<int:pk>/', MantenimientoDetailView.as_view(), name='detalle_mantenimiento'),
    path('mantenimientos/nuevo/', MantenimientoCreateView.as_view(), name='crear_mantenimiento'),
    path('mantenimientos/<int:pk>/editar/', MantenimientoUpdateView.as_view(), name='editar_mantenimiento'),
    path('mantenimientos/<int:pk>/eliminar/', MantenimientoDeleteView.as_view(), name='eliminar_mantenimiento'),
] 
