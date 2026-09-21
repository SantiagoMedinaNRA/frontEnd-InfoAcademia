# InfoAcadémica — Primera entrega Front End

Sitio estático (HTML + CSS + JavaScript) que implementa la primera versión de la
propuesta **InfoAcadémica**, usando **Bootstrap 5** como framework de maquetación
y JavaScript "vanilla" para la interactividad.

## Cómo verlo

No requiere instalación ni servidor: abre `index.html` con doble clic en
cualquier navegador (Chrome, Edge, Firefox, etc.), o usa la extensión
"Live Server" si trabajas desde un editor de código.

## Estructura del proyecto

```
infoacademica/
├── index.html                 Home
├── noticias.html               Listado de noticias
├── noticia.html                 Detalle de una noticia (?id=1, 2, 3)
├── contacto.html                Formulario de contacto
├── admisiones.html              Sección Admisiones (placeholder, próxima entrega)
├── registro-academico.html      Sección Registro Académico (placeholder, próxima entrega)
├── css/
│   └── styles.css               Estilos propios del sitio
├── js/
│   ├── main.js                  Lógica común (enlace activo del menú)
│   ├── noticias-data.js         Datos de las noticias (arreglo JS)
│   ├── noticias.js              Renderiza las tarjetas de noticias (Home / Noticias)
│   ├── noticia-detalle.js       Pinta el detalle de la noticia y maneja "favoritos"
│   └── contacto.js               Validación del formulario de contacto
├── img/
│   ├── noticia-01.png, noticia-02.png, noticia-03.png   Imágenes de las noticias
│   └── favicon.png               Ícono del sitio
└── README.md
```

## Páginas incluidas en esta entrega

Las siguientes páginas corresponden a los wireframes de la propuesta:

- **Home** — hero con el mensaje principal y las 3 noticias destacadas.
- **Noticias** — listado completo de noticias.
- **Detalle de Noticia** — contenido completo de la noticia seleccionada, con
  botón para agregarla a favoritos (se guarda en el navegador con `localStorage`).
- **Contacto** — formulario con validación en el navegador (nombre, correo,
  mensaje).

`Admisiones` y `Registro Académico` quedan enlazados en el menú con una página
temporal, ya que su maquetación se desarrollará en una entrega posterior.

## Framework y librerías

- [Bootstrap 5.3.3](https://getbootstrap.com/) (vía CDN) — grid responsivo,
  barra de navegación y estilos de formulario.
- JavaScript nativo (sin librerías adicionales) para la lógica de negocio.
