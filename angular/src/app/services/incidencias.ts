import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidenciaServidor } from '../models/infraestructura.model';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://10.20.69.131:8000/api';

  // ------------------------------------------------------------------
  // RUTAS GENERALES (/api/incidencias/)
  // ------------------------------------------------------------------

  // Obtener el listado global de todas las incidencias
  getIncidencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidencias/`);
  }

  // Obtener el detalle de una incidencia específica por ID
  getIncidencia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidencias/${id}/`);
  }

  // Crear una incidencia de forma independiente
  createIncidencia(incidencia: IncidenciaServidor): Observable<any> {
    return this.http.post(`${this.apiUrl}/incidencias/`, incidencia);
  }

  // Actualizar una incidencia existente
  updateIncidencia(id: number, incidencia: IncidenciaServidor): Observable<any> {
    return this.http.put(`${this.apiUrl}/incidencias/${id}/`, incidencia);
  }

  // Eliminar una incidencia por ID
  deleteIncidencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/incidencias/${id}/`);
  }

  // ------------------------------------------------------------------
  // RUTAS ANIDADAS (/api/servidores/:servidorId/incidencias/)
  // ------------------------------------------------------------------

  // Obtener únicamente las incidencias ligadas a un servidor en particular
  getIncidenciasPorServidor(servidorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/servidores/${servidorId}/incidencias/`);
  }

  // Crear una incidencia asociando automáticamente el servidor en la URL
  createIncidenciaPorServidor(
    servidorId: number, 
    incidencia: Partial<any>
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/servidores/${servidorId}/incidencias/`, 
      incidencia
    );
  }
}