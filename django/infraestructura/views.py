from django.shortcuts import render, get_object_or_404, redirect
from infraestructura.models import NodoServidor, RegistroAuditoria
from infraestructura.forms import NodoServidorForm

#################################################################################################################

def crear_servidor(request):
    if request.method == 'POST':
        form = NodoServidorForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('home_servidores')

    else:
        form = NodoServidorForm()

    return render(request, 'infraestructura/crear_servidor.html', {'form': form})

def detalle_servidor(request, pk):
    servidor = get_object_or_404(NodoServidor, pk=pk)
    contexto = {'nodo': servidor}

    return render(request, 'infraestructura/detalle.html', contexto)
    
def lista_servidores(request):
	servidores = NodoServidor.objects.all()
	contexto = {'servidores': servidores}
	return render(request, 'infraestructura/index.html', contexto)

def editar_servidor(request, pk):
    nodo = get_object_or_404(NodoServidor, pk=pk)

    if request.method == 'PUT':
        form = NodoServidorForm(request.PUT, instance=nodo)

        if form.is_valid():
            form.save()
            return redirect('detalle_servidor', pk=nodo.pk)

    else:
        form = NodoServidorForm(instance=nodo)

    return render(request, 'infraestructura/editar_servidor.html', {'form': form, 'nodo': nodo})

def eliminar_servidor(request, pk):
    nodo = get_object_or_404(NodoServidor, pk=pk)

    # Creates a form and deletes only if the deletion is validated through the form
    if request.method == 'POST':
        nodo.delete()
        return redirect('home_servidores')

    return render(request, 'infraestructura/eliminar_servidor.html', {'nodo': nodo})

#################################################################################################################

def crear_auditoria():
    pass

def lista_auditorias(request):
    auditorias = RegistroAuditoria.objects.all()
    contexto = {'auditorias': auditorias}
    return render(request, 'infraestructura/auditorias.html', contexto)
     