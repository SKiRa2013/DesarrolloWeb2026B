import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { NodoServidor } from '../../../models/infraestructura.model';

@Component({
  selector: 'app-servidor-delete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servidor-delete.html',
  styleUrl: './servidor-delete.css'
})
export class ServidorDelete implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private servidorService = inject(ServidorService);

  servidor?: NodoServidor;
  cargando: boolean = true;
  eliminando: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarServidor(id);
    }
  }

  cargarServidor(id: number): void {
    this.cargando = true;
    this.servidorService.getServidor(id).subscribe({
      next: (data) => {
        this.servidor = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar servidor:', err);
        this.error = 'No se pudo obtener la información del servidor que deseas eliminar.';
        this.cargando = false;
      }
    });
  }

  confirmarEliminacion(): void {
    if (!this.servidor?.id) return;

    this.eliminando = true;
    this.servidorService.deleteServidor(this.servidor.id).subscribe({
      next: () => {
        this.router.navigate(['/servidores']);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.error = 'Ocurrió un error al intentar eliminar el servidor de la base de datos.';
        this.eliminando = false;
      }
    });
  }
}