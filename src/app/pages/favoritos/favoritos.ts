import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';
import { Noticia } from '../../models/noticia';

/**
 * Página de favoritos: cruza los ids guardados con las noticias existentes
 * y permite quitar una noticia de la lista desde la propia tarjeta.
 */
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, NoticiaCard],
  templateUrl: './favoritos.html',
})
export class Favoritos {
  private readonly noticiasService = inject(NoticiasService);
  private readonly favoritosService = inject(FavoritosService);

  /** Noticias favoritas que todavía existen (reactivo). */
  readonly favoritas = computed<Noticia[]>(() =>
    this.favoritosService
      .ids()
      .map((id) => this.noticiasService.obtenerPorId(id))
      .filter((n): n is Noticia => n !== null)
  );

  /** Quita una noticia de favoritos. */
  quitar(id: number): void {
    this.favoritosService.quitar(id);
  }
}
