# InfoAcadémica

Plataforma web de noticias tipo periódico digital, orientada a informar a la
comunidad estudiantil sobre los procesos de **Admisiones**, **Registro y Control
Académico** y la vida universitaria. Proyecto del módulo de **Desarrollo de
Front-End** del Politécnico Grancolombiano.

Este repositorio corresponde a la **segunda entrega**: una primera versión
funcional del aplicativo construida con HTML, CSS y JavaScript, tomando como base
la maquetación (mockups) definida en la primera entrega.

## Integrantes

- Marta Teresa Velandia Urrego 
- Carlos Mosquera Urrutia 
- Santiago Medina Peláez
- Laura Sofia Castellanos Manrique

## Descripción del proyecto

InfoAcadémica centraliza la información académica de interés para los estudiantes.
La navegación se organiza mediante un menú superior fijo presente en todas las
vistas, y el contenido de las noticias se carga de forma dinámica desde
JavaScript, sin necesidad de crear una página estática por cada artículo.

## Funcionalidades

- **Home**: sección de bienvenida (hero), noticias destacadas dinámicas, sección
  informativa y llamados a la acción.
- **Noticias**: listado completo de todas las noticias publicadas.
- **Detalle de noticia**: contenido completo de la noticia seleccionada, con botón
  para **agregar / quitar de favoritos** (persistencia con `localStorage`).
- **Favoritos**: lista personalizada de las noticias que el usuario ha guardado.
- **Gestión de noticias (Mini CRUD)**: crear nuevas noticias y eliminar las
  existentes; los cambios persisten en `localStorage`. Incluye la opción de
  restaurar las noticias de ejemplo.
- **Admisiones**: pasos del proceso, requisitos y calendario.
- **Registro Académico**: trámites frecuentes y fechas clave.
- **Contacto**: formulario con validación de campos obligatorios y de correo, con
  mensaje de confirmación.

## Tecnologías

- **HTML5** y **CSS3** (estilos propios en `css/styles.css`).
- **Bootstrap 5** (incluido localmente en `vendor/`) para el grid, la barra de
  navegación y los formularios.
- **JavaScript** nativo (sin frameworks) para la lógica de negocio.
- **localStorage** para la persistencia de noticias y favoritos.

## Estructura del proyecto

```
frontEnd-InfoAcademia/
├── index.html                 Home
├── noticias.html              Listado de noticias
├── noticia.html               Detalle de una noticia (?id=1, 2, 3, ...)
├── favoritos.html             Lista personalizada de favoritos
├── gestion.html               Gestión de noticias (crear / eliminar)
├── admisiones.html            Sección Admisiones
├── registro-academico.html    Sección Registro y Control Académico
├── contacto.html              Formulario de contacto
├── css/
│   └── styles.css             Estilos propios del sitio
├── js/
│   ├── main.js                Lógica común (enlace activo del menú)
│   ├── noticias-data.js       Datos semilla + capa NoticiasStore (CRUD sobre localStorage)
│   ├── noticias.js            Renderiza las tarjetas de noticias (Home / Noticias)
│   ├── noticia-detalle.js     Pinta el detalle y maneja "favoritos"
│   ├── favoritos.js           Muestra la lista de favoritos
│   ├── gestion.js             Mini CRUD de noticias
│   └── contacto.js            Validación del formulario de contacto
├── img/                       Imágenes de las noticias y favicon
├── vendor/                    Bootstrap 5 (CSS y JS)
└── README.md
```

## Cómo ejecutarlo

No requiere instalación ni servidor. Hay dos formas de verlo:

1. Abrir `index.html` con doble clic en cualquier navegador (Chrome, Edge, Firefox).

## Cómo funciona la persistencia

- La primera vez que se abre el sitio, las **noticias de ejemplo** se copian a
  `localStorage`. A partir de ahí, todas las noticias (incluidas las que crees o
  elimines desde **Gestión**) se leen y guardan desde el navegador.
- Los **favoritos** se guardan como una lista de identificadores en `localStorage`,
  por lo que se recuerdan aunque recargues o cierres el navegador.
- Desde **Gestión → "Restaurar noticias de ejemplo"** puedes volver al estado
  inicial en cualquier momento.
