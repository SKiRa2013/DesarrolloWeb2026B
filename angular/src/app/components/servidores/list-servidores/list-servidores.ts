import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  private servidorService = inject(ServidorService);

  servidores: NodoServidor[] = [];
  cargando: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(): void {
    this.cargando = true;
    this.servidorService.getServidores().subscribe({
      next: (data) => {
        this.servidores = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener los servidores:', err);
        this.error = 'No se pudo conectar con la API de servidores.';
        this.cargando = false;
      }
    });
  }

  eliminarServidor(id?: number): void {
    if (!id) return;
    
    if (confirm('¿Estás seguro de que deseas eliminar este servidor?')) {
      this.servidorService.deleteServidor(id).subscribe({
        next: () => {
          // Filtramos la lista local para no reconsultar toda la API
          this.servidores = this.servidores.filter(s => s.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Ocurrió un error al intentar eliminar el servidor.');
        }
      });
    }
  }
}