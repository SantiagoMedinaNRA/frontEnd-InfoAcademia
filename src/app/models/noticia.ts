/**
 * Modelo de una noticia de InfoAcadémica.
 * `cuerpo` es un arreglo de párrafos para poder pintar cada <p> por separado.
 */
export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  imagen: string;
  cuerpo: string[];
}

/** Datos que se reciben del formulario de "Crear noticia" (Gestión). */
export interface NuevaNoticia {
  titulo: string;
  resumen: string;
  imagen: string;
  /** Texto plano; se separa en párrafos por saltos de línea. */
  cuerpo: string;
}
