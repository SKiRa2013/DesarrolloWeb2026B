import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { IncidenciaService } from '../../../services/incidencias';
import { NodoServidor, IncidenciaServidor } from '../../../models/infraestructura.model';

@Component({
  selector: 'app-servidor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servidor-detail.html',
  styleUrl: './servidor-detail.css'
})
export class ServidorDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private servidorService = inject(ServidorService);
  private incidenciaService = inject(IncidenciaService);

  servidor: NodoServidor | null = null;
  incidencias: IncidenciaServidor[] = [];
  cargando: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.cargarDetalles(id);
    }
  }

  cargarDetalles(id: number): void {
    this.cargando = true;
    this.servidorService.getServidor(id).subscribe({
      next: (data) => {
        this.servidor = data;
        this.cargarIncidencias(id);
      },
      error: (err) => {
        console.error('Error al cargar servidor:', err);
        this.error = 'No se encontró el servidor solicitado.';
        this.cargando = false;
      }
    });
  }

  cargarIncidencias(servidorId: number): void {
    this.incidenciaService.getIncidenciasPorServidor(servidorId).subscribe({
      next: (data) => {
        this.incidencias = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar incidencias:', err);
        this.cargando = false;
      }
    });
  }
}