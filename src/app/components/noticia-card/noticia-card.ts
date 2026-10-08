import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';

/**
 * Tarjeta de una noticia, reutilizada en Home, Noticias y Favoritos.
 *
 * Demuestra el binding de entrada/salida de Angular:
 *  - @Input() noticia:   datos que recibe del componente padre.
 *  - @Input() mostrarQuitar: muestra el botón "Quitar" (solo en Favoritos).
 *  - @Output() quitar:   evento que emite al padre cuando se pulsa "Quitar".
 */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink],
  templateUrl: './noticia-card.html',
})
export class NoticiaCard {
  /** Noticia a mostrar en la tarjeta. */
  @Input({ required: true }) noticia!: Noticia;

  /** Si es true, se muestra el botón "Quitar" (vista Favoritos). */
  @Input() mostrarQuitar = false;

  /** Emite el id de la noticia cuando el usuario pulsa "Quitar". */
  @Output() quitar = new EventEmitter<number>();

  onQuitar(): void {
    this.quitar.emit(this.noticia.id);
  }
}
