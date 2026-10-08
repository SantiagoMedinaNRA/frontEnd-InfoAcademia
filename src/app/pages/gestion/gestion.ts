import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';

/**
 * Gestión de noticias (Mini CRUD): crear y eliminar noticias.
 * Usa Reactive Forms con validación. Los cambios persisten vía NoticiasService
 * (localStorage) y se reflejan automáticamente en Home y Noticias.
 */
@Component({
  selector: 'app-gestion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './gestion.html',
})
export class Gestion {
  private readonly fb = inject(FormBuilder);
  private readonly noticiasService = inject(NoticiasService);

  /** Mensaje de confirmación que se muestra tras una acción. */
  readonly alerta = signal('');
  /** Marca si el formulario ya fue enviado (para mostrar errores). */
  readonly enviado = signal(false);

  /** Formulario reactivo con las mismas reglas que la versión HTML. */
  readonly form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    resumen: ['', [Validators.required, Validators.minLength(10)]],
    imagen: [''],
    cuerpo: ['', [Validators.required, Validators.minLength(20)]],
  });

  /** Lista de noticias publicadas (más recientes primero). */
  get noticias() {
    return this.noticiasService.obtenerTodas();
  }

  /** Crea una noticia si el formulario es válido. */
  publicar(): void {
    this.enviado.set(true);
    if (this.form.invalid) {
      return;
    }
    this.noticiasService.crear(this.form.getRawValue());
    this.form.reset();
    this.enviado.set(false);
    this.mostrarAlerta('¡Noticia publicada! Ya aparece en el listado y en el Home.');
  }

  /** Elimina una noticia tras confirmación. */
  eliminar(id: number, titulo: string): void {
    if (!confirm(`¿Eliminar "${titulo}"?`)) {
      return;
    }
    this.noticiasService.eliminar(id);
    this.mostrarAlerta('Noticia eliminada.');
  }

  /** Restaura las noticias de ejemplo tras confirmación. */
  restaurar(): void {
    const ok = confirm(
      'Esto reemplazará las noticias actuales por las de ejemplo. ¿Continuar?'
    );
    if (!ok) {
      return;
    }
    this.noticiasService.restaurar();
    this.mostrarAlerta('Se restauraron las noticias de ejemplo.');
  }

  /** Muestra una alerta temporal durante 4 segundos. */
  private mostrarAlerta(mensaje: string): void {
    this.alerta.set(mensaje);
    setTimeout(() => this.alerta.set(''), 4000);
  }
}
