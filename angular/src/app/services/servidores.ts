import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NodoServidor } from '../models/infraestructura.model';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.20.13:8000/api';

  getServidores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servidores/`);
  }

  getServidor(id: number): Observable<any> {
    return this.http.get(`\({this.apiUrl}/servidores/\){id}/`);
  }

  createServidor(servidor: NodoServidor): Observable<any> {
    return this.http.post(`${this.apiUrl}/servidores/new/`, servidor);
  }

  updateServidor(id: number, servidor: NodoServidor): Observable<any> {
    return this.http.put(`\({this.apiUrl}/servidores/\){id}/edit/`, servidor);
  }

  deleteServidor(id: number): Observable<any> {
    return this.http.delete(`\({this.apiUrl}/servidores/\){id}/delete/`);
  }
}