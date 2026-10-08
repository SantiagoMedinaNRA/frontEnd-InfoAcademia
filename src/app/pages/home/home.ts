import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';

/**
 * Página de inicio (Home): hero, noticias destacadas (máximo 3),
 * sección informativa y llamado a la acción.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, NoticiaCard],
  templateUrl: './home.html',
})
export class Home {
  private readonly noticiasService = inject(NoticiasService);

  /** Hasta 3 noticias más recientes para la sección destacada. */
  get destacadas() {
    return this.noticiasService.obtenerTodas().slice(0, 3);
  }
}
