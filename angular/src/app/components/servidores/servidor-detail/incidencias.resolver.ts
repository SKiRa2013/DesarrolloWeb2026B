import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IncidenciaService } from '../../../services/incidencias';

export const incidenciasResolver: ResolveFn<any> = (route) => {
  const incidenciaService = inject(IncidenciaService);
  const id = Number(route.paramMap.get('id'));

  if (isNaN(id)) return of([]);

  return incidenciaService.getIncidenciasPorServidor(id).pipe(
    catchError((error) => {
      console.error('Error al precargar incidencias:', error);
      return of([]);
    })
  );
};
