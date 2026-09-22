import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ServidorService } from '../../../services/servidores';
import { NodoServidor } from '../../../models/infraestructura.model';

export const servidorFormResolver: ResolveFn<any> = (route) => {
  const servidorService = inject(ServidorService);
  const router = inject(Router);
  const idParam = route.paramMap.get('id');

  // Si no hay parámetro 'id', estamos en modo creación
  if (!idParam) {
    return of(null);
  }

  const id = Number(idParam);
  if (isNaN(id)) {
    router.navigate(['/servidores']);
    return of(null);
  }

  return servidorService.getServidor(id).pipe(
    catchError((error) => {
      console.error('Error al precargar el servidor para edición:', error);
      router.navigate(['/servidores']);
      return of(null);
    })
  );
};
