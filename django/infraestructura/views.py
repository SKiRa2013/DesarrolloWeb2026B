from django.shortcuts import render, get_object_or_404
from infraestructura.models import NodoServidor

def detalle_servidor(request, pkey):
    servidor = get_object_or_404(NodoServidor, pk=pkey)
    contexto = {'nodo': servidor}
    return render(request, 'infraestructura/detalle.html', contexto)
    
def lista_servidores(request):
	servidores = NodoServidor.objects.all()
	contexto = {'servidores': servidores}
	return render(request, 'infraestructura/index.html', contexto)
