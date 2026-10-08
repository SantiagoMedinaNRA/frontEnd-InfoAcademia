import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { Noticia } from '../../models/noticia';

/**
 * Detalle de una noticia. Lee el parámetro `id` de la ruta (/noticia/:id),
 * muestra el contenido completo y permite agregar/quitar de favoritos.
 */
@Component({
  selector: 'app-noticia-detalle',
  imports: [RouterLink],
  templateUrl: './noticia-detalle.html',
})
export class NoticiaDetalle {
  private readonly route = inject(ActivatedRoute);
  private readonly noticiasService = inject(NoticiasService);
  private readonly favoritosService = inject(FavoritosService);

  /** Id de la noticia tomado de la URL, como signal reactivo. */
  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 }
  );

  /** Noticia solicitada (o null si no existe). */
  readonly noticia = computed<Noticia | null>(() =>
    this.noticiasService.obtenerPorId(this.id())
  );

  /** Estado reactivo del botón de favoritos. */
  readonly esFavorito = computed(() => {
    const n = this.noticia();
    return n ? this.favoritosService.ids().includes(n.id) : false;
  });

  /** Alterna la noticia actual en la lista de favoritos. */
  alternarFavorito(): void {
    const n = this.noticia();
    if (n) {
      this.favoritosService.alternar(n.id);
    }
  }
}
