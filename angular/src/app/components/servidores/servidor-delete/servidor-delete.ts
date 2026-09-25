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

  servidor: NodoServidor | null = null;
  eliminando: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    // Obtenemos los datos resueltos por el Resolver
    this.servidor = this.route.snapshot.data['servidor'];
  }

  confirmarEliminacion(): void {
    if (!this.servidor?.id) return;

    this.eliminando = true;
    this.error = null;

    this.servidorService.deleteServidor(this.servidor.id).subscribe({
      next: () => {
        this.router.navigate(['/servidores']);
      },
      error: (err) => {
        console.error('Error al eliminar el servidor:', err);
        this.error = 'Ocurrió un error al intentar eliminar el servidor.';
        this.eliminando = false;
      }
    });
  }
}