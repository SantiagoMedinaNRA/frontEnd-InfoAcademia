import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Formulario de contacto. Al ser una entrega solo de Front End, no envía datos
 * a un servidor: valida los campos y muestra un mensaje de confirmación.
 */
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
})
export class Contacto {
  private readonly fb = inject(FormBuilder);

  /** Mensaje de confirmación tras un envío válido. */
  readonly confirmacion = signal('');
  /** Marca si ya se intentó enviar (para mostrar errores). */
  readonly enviado = signal(false);

  /** Formulario reactivo con las mismas reglas que la versión HTML. */
  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  /** Valida y "envía" el formulario. */
  enviar(): void {
    this.enviado.set(true);
    if (this.form.invalid) {
      return;
    }
    this.confirmacion.set('¡Gracias por escribirnos! Hemos recibido tu mensaje.');
    this.form.reset();
    this.enviado.set(false);
    setTimeout(() => this.confirmacion.set(''), 5000);
  }
}
