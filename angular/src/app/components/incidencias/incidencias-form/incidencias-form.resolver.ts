import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { IncidenciaService } from '../../../services/incidencias';
import { catchError, of } from 'rxjs';

export const incidenciasFormResolver: ResolveFn<any> = (route) => {
  const servidorService = inject(ServidorService);
  const incidenciaService = inject(IncidenciaService);
  const id = Number(route.paramMap.get('id'));  
}