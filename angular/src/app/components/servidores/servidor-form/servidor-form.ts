import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServidorService } from '../../../services/servidores';
import { NodoServidor } from '../../../models/infraestructura.model';

@Component({
  selector: 'app-servidor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './servidor-form.html',
  styleUrl: './servidor-form.css'
})
export class ServidorForm implements OnInit {
  private fb = inject(FormBuilder);
  private servidorService = inject(ServidorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formServidor: FormGroup = this.fb.group({
    nombre_host: ['', [Validators.required, Validators.maxLength(100)]],
    direccion_ip: ['', [Validators.pattern('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\(|^\)')]],
    motor_contenedores: ['Docker', [Validators.required]],
    proxy_nginx: [true],
    en_produccion: [false]
  });

  isEditMode: boolean = false;
  servidorId: number | null = null;
  cargando: boolean = false;
  enviando: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.servidorId = +idParam;
      this.cargarServidor(this.servidorId);
    }
  }

  cargarServidor(id: number): void {
    this.cargando = true;
    this.servidorService.getServidor(id).subscribe({
      next: (servidor) => {
        this.formServidor.patchValue(servidor);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener el servidor:', err);
        this.error = 'No se pudo cargar la información del servidor.';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.formServidor.invalid) {
      this.formServidor.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.error = null;
    const datos: NodoServidor = this.formServidor.value;

    if (this.isEditMode && this.servidorId) {
      this.servidorService.updateServidor(this.servidorId, datos).subscribe({
        next: () => this.router.navigate(['/servidores']),
        error: (err) => {
          console.error('Error al actualizar:', err);
          this.error = 'Ocurrió un error al actualizar el servidor.';
          this.enviando = false;
        }
      });
    } else {
      this.servidorService.createServidor(datos).subscribe({
        next: () => this.router.navigate(['/servidores']),
        error: (err) => {
          console.error('Error al guardar:', err);
          this.error = 'Ocurrió un error al registrar el servidor.';
          this.enviando = false;
        }
      });
    }
  }
}