from django.shortcuts import render, get_object_or_404, redirect
from infraestructura.models import NodoServidor, RegistroAuditoria, IncidenciaServidor
from infraestructura.forms import NodoServidorForm, IncidenciaServidorForm

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

    if request.method == 'POST':
        form = NodoServidorForm(request.POST, instance=nodo)

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
     
#################################################################################################################

def crear_incidencia(request, pk):
    servidor = get_object_or_404(NodoServidor, pk=pk)
    
    if request.method == 'POST':
        incidencia = IncidenciaServidor(servidor=servidor)
        form = IncidenciaServidorForm(request.POST, instance=incidencia)

        if form.is_valid():
            form.save()
            incidencia.servidor = servidor
            incidencia.save()
            return redirect('detalle_servidor', pk=pk)

    else:
        form = IncidenciaServidorForm()

    return render(request, 'infraestructura/crear_incidencia.html', {'form': form, 'servidor': servidor})

def detalle_incidencia(request, pk, inc_pk):
    servidor = get_object_or_404(NodoServidor, pk=pk)
    incidencia = get_object_or_404(IncidenciaServidor, pk=inc_pk, servidor=servidor)

    return render(request, 'infraestructura/detalle_incidencia.html', {
        'servidor': servidor,
        'incidencia': incidencia
    })

def editar_incidencia(request, pk, inc_pk):
    servidor = get_object_or_404(NodoServidor, pk=pk)
    incidencia = get_object_or_404(IncidenciaServidor, pk=inc_pk, servidor=servidor)

    if request.method == 'POST':
        form = IncidenciaServidorForm(request.POST, instance=incidencia)
        
        if form.is_valid():
            form.save()
            return redirect('detalle_incidencia', pk=servidor.pk, inc_pk=incidencia.pk)
        
    else:
        form = IncidenciaServidorForm(instance=incidencia)

    return render(request, 'infraestructura/editar_incidencia.html', {
        'form': form,
        'servidor': servidor,
        'incidencia': incidencia
    })
    
def eliminar_incidencia(request, pk, inc_pk):
    servidor = get_object_or_404(NodoServidor, pk=pk)
    incidencia = get_object_or_404(IncidenciaServidor, pk=inc_pk, servidor=servidor)

    if request.method == 'POST':
        incidencia.delete()
        return redirect('detalle_servidor', pk=servidor.pk)

    return render(request, 'infraestructura/eliminar_incidencia.html', {
        'servidor': servidor,
        'incidencia': incidencia
    })
    