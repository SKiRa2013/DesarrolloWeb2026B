import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NodoServidor, IncidenciaServidor } from '../../../models/infraestructura.model';
import { IncidenciaService } from '../../../services/incidencias';

@Component({
  selector: 'app-servidor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servidor-detail.html',
  styleUrl: './servidor-detail.css'
})
export class ServidorDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private incidenciaService = inject(IncidenciaService);

  servidor: NodoServidor | null = null;
  incidencias: IncidenciaServidor[] = [];

  ngOnInit(): void {
    // Leemos directamente las claves definidas en app.routes.ts
    this.route.data.subscribe(({ servidor, incidencias }) => {
      this.servidor = servidor || null;
      this.incidencias = incidencias || [];
    });
  }

  recargarIncidencias(): void {
    if (!this.servidor?.id) return;

    this.incidenciaService.getIncidenciasPorServidor(this.servidor.id).subscribe({
      next: (data) => (this.incidencias = data),
      error: (err) => console.error('Error al recargar incidencias:', err)
    });
  }
}
