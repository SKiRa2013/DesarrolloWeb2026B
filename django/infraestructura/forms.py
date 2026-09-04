from django import forms
from infraestructura.models import NodoServidor, RegistroAuditoria

class NodoServidorForm(forms.ModelForm):
    class Meta:
        model = NodoServidor
        fields = ['nombre_host', 'direccion_ip', 'motor_contenedores', 'proxy_inverso', 'en_produccion',]
        

class RegistroAuditoriaForm(forms.ModelForm):
    class Meta:
        model = RegistroAuditoria
        fields = ['servidor', 'detalles',]

