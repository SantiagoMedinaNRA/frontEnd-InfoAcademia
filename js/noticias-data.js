/**
 * Fuente de datos de las noticias mostradas en Home, Noticias y Detalle de Noticia.
 * En esta primera entrega (solo Front End) los datos viven en este arreglo de
 * JavaScript. Cuando el proyecto tenga backend, este archivo se reemplazará
 * por una llamada a la API (fetch) que traiga la información desde el servidor.
 */
const NOTICIAS = [
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
