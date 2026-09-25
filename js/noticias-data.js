/**
 * noticias-data.js
 * -----------------------------------------------------------------------------
 * Fuente de datos de las noticias mostradas en Home, Noticias, Detalle y la
 * página de Gestión (Mini CRUD).
 *
 * Cómo funciona:
 *  - NOTICIAS_SEMILLA es el contenido base que viene con el proyecto.
 *  - La primera vez que se abre el sitio, la semilla se copia a localStorage.
 *  - A partir de ahí, TODA lectura y escritura se hace contra localStorage,
 *    de modo que las noticias creadas o eliminadas por el usuario persisten
 *    entre visitas sin necesidad de un backend.
 *
 * Este archivo expone un objeto global `NoticiasStore` con las operaciones
 * CRUD que usan el resto de los scripts. Cuando el proyecto tenga backend,
 * bastará con reemplazar el cuerpo de estos métodos por llamadas fetch().
 */

const NOTICIAS_SEMILLA = [
  {
    id: 1,
    titulo: "Inscripciones abiertas para el período 2027-1",
    resumen: "Conoce las fechas y requisitos para las inscripciones al nuevo periodo académico",
    imagen: "img/noticia-01.png",
    cuerpo: [
      "La Fundación Tecnológica Autónoma de Bogotá - FABA informa que a partir del lunes, 01 de octubre estarán abiertas las inscripciones para el periodo académico 2027-1.",
      "Los estudiantes podrán hacer el registro en el sistema SIGA, ahí encontrarán la información completa, de fechas, documentos requeridos y las indicaciones para el pago de matrícula.",
      "Se recomienda a todos los estudiantes verificar su información personal y académica antes de iniciar el proceso, con el fin de evitar inconvenientes durante la inscripción."
    ]
  },
  {
    id: 2,
    titulo: "Fechas clave del proceso de admisión 2027-1",
    resumen: "Consulta en la página institucional el calendario oficial para el próximo semestre",
    imagen: "img/noticia-02.png",
    cuerpo: [
      "La Oficina de Admisiones de la Fundación Tecnológica Autónoma de Bogotá - FABA publicó el calendario oficial con las fechas clave del proceso de admisión para el periodo 2027-1.",
      "Entre las fechas más importantes se encuentran: apertura de inscripciones, presentación de la prueba de admisión, publicación de resultados y confirmación de cupo.",
      "Se recomienda a los aspirantes consultar periódicamente la página institucional, ya que las fechas pueden tener ajustes según la disponibilidad de cupos por programa."
    ]
  },
  {
    id: 3,
    titulo: "Cómo prepararte para tu proceso académico",
    resumen: "Tips y recomendaciones para no perderte ningún trámite importante",
    imagen: "img/noticia-03.png",
    cuerpo: [
      "Iniciar o continuar un proceso académico implica estar atento a varios trámites: inscripción, pago de matrícula, selección de materias y actualización de documentos.",
      "Para no perderte ningún paso, te recomendamos crear un calendario personal con las fechas límite, activar las notificaciones del sistema SIGA y revisar tu correo institucional con frecuencia.",
      "Ante cualquier duda, puedes comunicarte con nosotros a través de la sección de Contacto y un asesor académico te ayudará a resolverla."
    ]
  }
];

/**
 * NoticiasStore: pequeña capa de acceso a datos sobre localStorage.
 * Es la única puerta de entrada a las noticias para el resto de la aplicación.
 */
const NoticiasStore = (function () {
  const CLAVE = "infoacademica_noticias";
  // Imagen usada cuando se crea una noticia sin indicar una ruta de imagen.
  const IMAGEN_POR_DEFECTO = "img/noticia-destacada.jpg";

  /** Lee el arreglo de noticias desde localStorage. */
  function leerCrudo() {
    try {
      const guardado = localStorage.getItem(CLAVE);
      return guardado ? JSON.parse(guardado) : null;
    } catch (error) {
      return null;
    }
  }

  /** Guarda el arreglo completo de noticias en localStorage. */
  function guardar(noticias) {
    localStorage.setItem(CLAVE, JSON.stringify(noticias));
  }

  /**
   * Inicializa el almacenamiento con la semilla la primera vez.
   * Si localStorage no está disponible (p. ej. archivo abierto sin permisos),
   * se trabaja con una copia en memoria de la semilla.
   */
  function inicializar() {
    const actual = leerCrudo();
    if (actual === null) {
      guardar(NOTICIAS_SEMILLA);
      return NOTICIAS_SEMILLA.slice();
    }
    return actual;
  }

  /** Devuelve todas las noticias (más recientes primero). */
  function obtenerTodas() {
    const noticias = inicializar();
    return noticias.slice().sort((a, b) => b.id - a.id);
  }

  /** Devuelve una noticia por su id, o null si no existe. */
  function obtenerPorId(id) {
    const numero = parseInt(id, 10);
    return inicializar().find((n) => n.id === numero) || null;
  }

  /**
   * Crea una noticia nueva. Recibe { titulo, resumen, imagen, cuerpo }
   * donde `cuerpo` puede ser un string (se separa por saltos de línea)
   * o un arreglo de párrafos. Devuelve la noticia creada.
   */
  function crear(datos) {
    const noticias = inicializar();
    const nuevoId = noticias.reduce((max, n) => Math.max(max, n.id), 0) + 1;

    const cuerpo = Array.isArray(datos.cuerpo)
      ? datos.cuerpo
      : String(datos.cuerpo || "")
          .split("\n")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

    const nueva = {
      id: nuevoId,
      titulo: (datos.titulo || "").trim(),
      resumen: (datos.resumen || "").trim(),
      imagen: (datos.imagen || "").trim() || IMAGEN_POR_DEFECTO,
      cuerpo: cuerpo.length ? cuerpo : ["(Sin contenido)"]
    };

    noticias.push(nueva);
    guardar(noticias);
    return nueva;
  }

  /** Elimina una noticia por id. Devuelve true si se eliminó. */
  function eliminar(id) {
    const numero = parseInt(id, 10);
    const noticias = inicializar();
    const restantes = noticias.filter((n) => n.id !== numero);
    if (restantes.length === noticias.length) return false;
    guardar(restantes);
    return true;
  }

  /** Restaura las noticias a los datos originales de la semilla. */
  function restaurar() {
    guardar(NOTICIAS_SEMILLA);
    return NOTICIAS_SEMILLA.slice();
  }

  return {
    obtenerTodas,
    obtenerPorId,
    crear,
    eliminar,
    restaurar
  };
})();
