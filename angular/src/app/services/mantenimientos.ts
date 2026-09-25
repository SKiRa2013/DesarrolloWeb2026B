import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/infraestructura.model';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://10.20.55.44:8000/api';

  getMantenimientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mantenimientos`);
  }

  getMantenimiento(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/mantenimientos/${id}/`);
  }

  createMantenimiento(mantenimiento: Mantenimiento): Observable<any> {
    return this.http.post(`${this.apiUrl}/mantenimientos/`, mantenimiento);
  }

  updateMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/mantenimientos/${id}/`, mantenimiento);
  }

  deleteMantenimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mantenimientos/${id}/`);
  }
}