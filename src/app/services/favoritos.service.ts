import { Injectable, computed, signal } from '@angular/core';

/**
 * FavoritosService
 * -----------------------------------------------------------------------------
 * Gestiona la lista de identificadores de noticias marcadas como favoritas.
 * Los ids se guardan en localStorage ('infoacademica_favoritos') para que se
 * recuerden entre visitas. Expone signals para que la UI reaccione a los
 * cambios (p. ej. el botón de favorito en el detalle y la vista Favoritos).
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly CLAVE = 'infoacademica_favoritos';

  /** Estado reactivo: ids de noticias favoritas. */
  private readonly _ids = signal<number[]>(this.cargarInicial());
  /** Signal de solo lectura con los ids favoritos. */
  readonly ids = this._ids.asReadonly();
  /** Cantidad de favoritos (útil para badges o contadores). */
  readonly total = computed(() => this._ids().length);

  /** Indica si una noticia está en favoritos. */
  esFavorito(id: number): boolean {
    return this._ids().includes(id);
  }

  /** Agrega o quita de favoritos. Devuelve el nuevo estado (true = favorito). */
  alternar(id: number): boolean {
    const actuales = this._ids();
    const esFavorito = actuales.includes(id);
    const siguientes = esFavorito
      ? actuales.filter((f) => f !== id)
      : [...actuales, id];
    this.guardar(siguientes);
    return !esFavorito;
  }

  /** Quita un id de favoritos (usado desde la vista Favoritos). */
  quitar(id: number): void {
    this.guardar(this._ids().filter((f) => f !== id));
  }

  /** Guarda la lista y actualiza el signal. */
  private guardar(ids: number[]): void {
    this._ids.set(ids);
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(ids));
    } catch {
      // localStorage no disponible: se trabaja solo en memoria.
    }
  }

  /** Carga los ids iniciales desde localStorage. */
  private cargarInicial(): number[] {
    try {
      const guardado = localStorage.getItem(this.CLAVE);
      return guardado ? (JSON.parse(guardado) as number[]) : [];
    } catch {
      return [];
    }
  }
}
