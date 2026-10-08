import { Component, inject } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';

/** Página de listado completo de noticias. */
@Component({
  selector: 'app-noticias',
  imports: [NoticiaCard],
  templateUrl: './noticias.html',
})
export class Noticias {
  private readonly noticiasService = inject(NoticiasService);

  /** Todas las noticias (más recientes primero). */
  get noticias() {
    return this.noticiasService.obtenerTodas();
  }
}
