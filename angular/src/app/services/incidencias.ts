import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidenciaServidor } from '../models/infraestructura.model';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://10.20.55.44:8000/api';

  getIncidencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidencias/`);
  }

  getIncidencia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidencias/${id}/`);
  }

  createIncidencia(incidencia: IncidenciaServidor): Observable<any> {
    return this.http.post(`${this.apiUrl}/incidencias/`, incidencia);
  }

  updateIncidencia(id: number, incidencia: IncidenciaServidor): Observable<any> {
    return this.http.put(`${this.apiUrl}/incidencias/${id}/`, incidencia);
  }

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