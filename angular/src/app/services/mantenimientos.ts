import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/infraestructura.model';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.20.13:8000/api/mantenimientos';

  getMantenimientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getMantenimiento(id: number): Observable<any> {
    return this.http.get(`\({this.apiUrl}/\){id}/`);
  }

  createMantenimiento(mantenimiento: Mantenimiento): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, mantenimiento);
  }

  updateMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<any> {
    return this.http.put(`\({this.apiUrl}/\){id}/`, mantenimiento);
  }

  deleteMantenimiento(id: number): Observable<any> {
    return this.http.delete(`\({this.apiUrl}/\){id}/`);
  }
}