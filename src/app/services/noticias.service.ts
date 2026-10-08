import { Injectable, signal } from '@angular/core';
import { Noticia, NuevaNoticia } from '../models/noticia';
import { NOTICIAS_SEMILLA } from '../data/noticias-semilla';

/**
 * NoticiasService
 * -----------------------------------------------------------------------------
 * Capa de acceso a datos de las noticias. Reemplaza al antiguo `NoticiasStore`
 * de la versión en JavaScript puro.
 *
 * - La primera vez que se abre el sitio, la semilla se copia a localStorage.
 * - A partir de ahí toda lectura/escritura se hace contra localStorage, por lo
 *   que las noticias creadas o eliminadas persisten entre visitas sin backend.
 * - Expone un `signal` de solo lectura (`noticias`) para que los componentes
 *   se actualicen de forma reactiva cuando cambia el listado.
 *
 * Cuando el proyecto tenga backend, basta con reemplazar el cuerpo de estos
 * métodos por llamadas HTTP (HttpClient).
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly CLAVE = 'infoacademica_noticias';
  /** Imagen usada cuando se crea una noticia sin indicar ruta. */
  private readonly IMAGEN_POR_DEFECTO = 'img/noticia-destacada.jpg';

  /** Estado reactivo: lista completa de noticias (más recientes primero). */
  private readonly _noticias = signal<Noticia[]>(this.cargarInicial());
  /** Signal de solo lectura expuesto a los componentes. */
  readonly noticias = this._noticias.asReadonly();

  // ---------------------------------------------------------------------------
  // Lectura
  // ---------------------------------------------------------------------------

  /** Devuelve todas las noticias ordenadas de más reciente a más antigua. */
  obtenerTodas(): Noticia[] {
    return [...this._noticias()].sort((a, b) => b.id - a.id);
  }

  /** Devuelve una noticia por id, o null si no existe. */
  obtenerPorId(id: number): Noticia | null {
    return this._noticias().find((n) => n.id === id) ?? null;
  }

  // ---------------------------------------------------------------------------
  // Escritura (CRUD)
  // ---------------------------------------------------------------------------

  /** Crea una noticia nueva a partir de los datos del formulario. */
  crear(datos: NuevaNoticia): Noticia {
    const actuales = this._noticias();
    const nuevoId = actuales.reduce((max, n) => Math.max(max, n.id), 0) + 1;

    const cuerpo = String(datos.cuerpo ?? '')
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const nueva: Noticia = {
      id: nuevoId,
      titulo: (datos.titulo ?? '').trim(),
      resumen: (datos.resumen ?? '').trim(),
      imagen: (datos.imagen ?? '').trim() || this.IMAGEN_POR_DEFECTO,
      cuerpo: cuerpo.length ? cuerpo : ['(Sin contenido)'],
    };

    this.guardar([...actuales, nueva]);
    return nueva;
  }

  /** Elimina una noticia por id. Devuelve true si se eliminó. */
  eliminar(id: number): boolean {
    const actuales = this._noticias();
    const restantes = actuales.filter((n) => n.id !== id);
    if (restantes.length === actuales.length) {
      return false;
    }
    this.guardar(restantes);
    return true;
  }

  /** Restaura las noticias a los datos originales de la semilla. */
  restaurar(): void {
    this.guardar(NOTICIAS_SEMILLA.map((n) => ({ ...n })));
  }

  // ---------------------------------------------------------------------------
  // Persistencia en localStorage
  // ---------------------------------------------------------------------------

  /** Guarda el arreglo completo y actualiza el signal. */
  private guardar(noticias: Noticia[]): void {
    this._noticias.set(noticias);
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(noticias));
    } catch {
      // localStorage no disponible: se trabaja solo en memoria.
    }
  }

  /** Carga el estado inicial desde localStorage o desde la semilla. */
  private cargarInicial(): Noticia[] {
    try {
      const guardado = localStorage.getItem(this.CLAVE);
      if (guardado) {
        return JSON.parse(guardado) as Noticia[];
      }
      const semilla = NOTICIAS_SEMILLA.map((n) => ({ ...n }));
      localStorage.setItem(this.CLAVE, JSON.stringify(semilla));
      return semilla;
    } catch {
      return NOTICIAS_SEMILLA.map((n) => ({ ...n }));
    }
  }
}
