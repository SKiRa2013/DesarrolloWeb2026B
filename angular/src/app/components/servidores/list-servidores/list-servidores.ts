import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { NodoServidor } from '../../../models/infraestructura.model';

@Component({
  selector: 'app-list-servidores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-servidores.html',
  styleUrl: './list-servidores.css'
})
export class ListServidores implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private servidorService = inject(ServidorService);

  // Propiedades del componente
  servidores: NodoServidor[] = [];
  error: string | null = null;

  ngOnInit(): void {
    // 1. Leemos los datos precargados por el Resolver de forma sincrónica e inmediata
    this.servidores = this.route.snapshot.data['servidores'] || [];
  }

  // Método de recarga manual si se necesita refrescar sin cambiar de página
  recargarDatos(): void {
    this.servidorService.getServidores().subscribe({
      next: (data) => (this.servidores = data),
      error: (err) => {
        console.error('Error al recargar servidores:', err);
        this.error = 'No se pudieron actualizar los datos.';
      }
    });
  }
}