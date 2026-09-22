import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ServidorService } from '../../../services/servidores';
import { NodoServidor } from '../../../models/infraestructura.model';

export const servidorResolver: ResolveFn<any> = (route) => {
  const servidorService = inject(ServidorService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (isNaN(id)) {
    router.navigate(['/servidores']);
    return of(null);
  }

  return servidorService.getServidor(id).pipe(
    catchError((error) => {
      console.error('Error al precargar servidor:', error);
      router.navigate(['/servidores']);
      return of(null);
    })
  );
};