from rest_framework import serializers
from infraestructura.models import NodoServidor, IncidenciaServidor


class IncidenciaServidorSerializer(serializers.ModelSerializer):
    severidad_display = serializers.CharField(source='get_severidad_display', read_only=True)
    estado_res_display = serializers.CharField(source='get_estado_res_display', read_only=True)

    class Meta:
        model = IncidenciaServidor
        fields = [
            'id',
            'servidor',
            'titulo',
            'descripcion',
            'severidad',
            'severidad_display',
            'estado_res',
            'estado_res_display',
            'fecha_reg'
        ]
        
        extra_kwargs = {
            'servidor': {'required': False}
        }

class NodoServidorSerializer(serializers.ModelSerializer):
    incidencias = IncidenciaServidorSerializer(many=True, read_only=True, source='servidores')
    motor_contenedores_display = serializers.CharField(source='get_motor_contenedores_display', read_only=True)

    class Meta:
        model = NodoServidor
        fields = [
            'id',
            'nombre_host',
            'direccion_ip',
            'motor_contenedores',
            'motor_contenedores_display',
            'proxy_inverso',
            'en_produccion',
            'fecha_despliegue',
            'incidencias'
        ]
