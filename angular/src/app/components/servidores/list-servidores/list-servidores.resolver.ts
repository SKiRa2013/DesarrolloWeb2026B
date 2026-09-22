import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { catchError, of } from 'rxjs';

export const listServidoresResolver: ResolveFn<any> = () => {
  const servidorService = inject(ServidorService);

  return servidorService.getServidores().pipe(
    catchError((error) => {
      console.error('Error al precargar servidores desde el Resolver:', error);
      // Retornamos un arreglo vacío en caso de error para no bloquear la navegación
      return of([]);
    })
  );
};