# InfoAcadémica (Angular)

Tercera entrega del proyecto **InfoAcadémica**: la aplicación reconstruida con
**Angular** (componentes, enlace de datos / binding, routing y servicios),
partiendo de la versión en HTML/CSS/JavaScript de la segunda entrega.

Es una plataforma web de noticias tipo periódico digital orientada a informar a
la comunidad estudiantil sobre **Admisiones**, **Registro y Control Académico** y
la vida universitaria.

## Integrantes

- Marta Teresa Velandia Urrego
- Carlos Mosquera Urrutia
- Santiago Medina Peláez
- Laura Sofia Castellanos Manrique

## Tecnologías

- **Angular 20** (componentes standalone, signals, control flow `@if` / `@for`).
- **TypeScript**.
- **Angular Router** con carga diferida (lazy loading) por ruta.
- **Reactive Forms** para la validación de los formularios.
- **Bootstrap 5** (instalado vía npm) para grid, navbar y formularios.
- **localStorage** para la persistencia de noticias y favoritos.

## Estructura del proyecto

```
angular-app/
├── src/
│   ├── index.html                 Documento base (incluye <app-root>)
│   ├── styles.css                 Estilos globales propios del sitio
│   └── app/
│       ├── app.ts                 Componente raíz (layout: navbar + outlet + footer)
│       ├── app.routes.ts          Definición de rutas (lazy loading)
│       ├── app.config.ts          Configuración (router, scroll)
│       ├── models/
│       │   └── noticia.ts         Interfaces Noticia y NuevaNoticia
│       ├── data/
│       │   └── noticias-semilla.ts  Noticias de ejemplo (semilla)
│       ├── services/
│       │   ├── noticias.service.ts  CRUD de noticias sobre localStorage (signals)
│       │   └── favoritos.service.ts Gestión de favoritos sobre localStorage
│       ├── components/
│       │   ├── navbar/            Barra de navegación (routerLinkActive)
│       │   ├── footer/            Pie de página
│       │   └── noticia-card/      Tarjeta de noticia reutilizable (@Input/@Output)
│       └── pages/
│           ├── home/              Inicio: hero + destacadas + info + CTA
│           ├── noticias/          Listado completo de noticias
│           ├── noticia-detalle/   Detalle (/noticia/:id) + favoritos
│           ├── favoritos/         Noticias guardadas
│           ├── gestion/           Mini CRUD (Reactive Forms)
│           ├── admisiones/        Pasos, requisitos y calendario
│           ├── registro-academico/ Trámites y fechas clave
│           └── contacto/          Formulario de contacto (Reactive Forms)
├── public/
│   ├── img/                       Imágenes de noticias y favicon
│   └── favicon.ico
├── angular.json                   Configuración de build (Bootstrap, budgets)
└── package.json                   Dependencias y scripts (incl. deploy)
```

## Conceptos de Angular usados

- **Componentes y binding**: interpolación `{{ }}`, property binding `[src]`,
  event binding `(click)`, y comunicación padre/hijo con `@Input()` / `@Output()`
  (ver `noticia-card`).
- **Servicios e inyección de dependencias**: `NoticiasService` y
  `FavoritosService` encapsulan el acceso a datos y se inyectan con `inject()`.
- **Signals**: el estado de noticias y favoritos es reactivo; la UI se actualiza
  sola cuando cambian.
- **Routing**: navegación entre páginas sin recargar, con `routerLink` y rutas
  cargadas de forma diferida.
- **Reactive Forms**: validación de los formularios de Contacto y Gestión.

## Cómo ejecutarlo en local

Requisitos: Node.js 20+ y npm.

```bash
cd angular-app
npm install
npm start
```

Luego abre `http://localhost:4200/` en el navegador.

## Build de producción

```bash
npm run build
```

El resultado queda en `dist/angular-app/browser`.

## Despliegue en GitHub Pages

El proyecto incluye `angular-cli-ghpages`. Para publicar:

```bash
npm run deploy
```

Este comando compila con el `base-href` del repositorio
(`/frontEnd-InfoAcademia/`) y publica el contenido en la rama `gh-pages`.
La aplicación queda disponible en:

```
https://santiagomedinanra.github.io/frontEnd-InfoAcademia/
```

> Nota: `angular-cli-ghpages` genera automáticamente un `404.html` (copia del
> `index.html`) para que las rutas de Angular funcionen al recargar la página.
```
