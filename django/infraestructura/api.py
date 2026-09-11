from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from infraestructura.models import NodoServidor, IncidenciaServidor
from infraestructura.serializers import NodoServidorSerializer, IncidenciaServidorSerializer


class NodoServidorViewSet(viewsets.ModelViewSet):
    queryset = NodoServidor.objects.all().order_by('-fecha_despliegue')
    serializer_class = NodoServidorSerializer

class IncidenciaServidorViewSet(viewsets.ModelViewSet):
    queryset = IncidenciaServidor.objects.all().order_by('-fecha_reg')
    serializer_class = IncidenciaServidorSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='servidor_pk',
                type=OpenApiTypes.INT,
                location=OpenApiParameter.PATH,
                description='ID del servidor para filtrar sus incidencias asociadas.',
                required=False
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()

        servidor_pk = self.kwargs.get('servidor_pk')
        
        if servidor_pk:
            return queryset.filter(servidor_id=servidor_pk)

        servidor_id = self.request.query_params.get('servidor_id')

        if servidor_id:
            queryset = queryset.filter(servidor_id=servidor_id)

        return queryset

    def perform_create(self, serializer):
        servidor_pk = self.kwargs.get('servidor_pk')

        if servidor_pk:
            servidor = get_object_or_404(NodoServidor, pk=servidor_pk)
            serializer.save(servidor=servidor)

        else:
            serializer.save()
