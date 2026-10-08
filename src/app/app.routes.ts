import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación. Cada página se carga de forma diferida (lazy loading)
 * con loadComponent para reducir el tamaño del bundle inicial.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'InfoAcadémica - Inicio',
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/noticias/noticias').then((m) => m.Noticias),
    title: 'InfoAcadémica - Noticias',
  },
  {
    path: 'noticia/:id',
    loadComponent: () =>
      import('./pages/noticia-detalle/noticia-detalle').then((m) => m.NoticiaDetalle),
    title: 'InfoAcadémica - Noticia',
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos').then((m) => m.Favoritos),
    title: 'InfoAcadémica - Favoritos',
  },
  {
    path: 'gestion',
    loadComponent: () => import('./pages/gestion/gestion').then((m) => m.Gestion),
    title: 'InfoAcadémica - Gestión',
  },
  {
    path: 'admisiones',
    loadComponent: () => import('./pages/admisiones/admisiones').then((m) => m.Admisiones),
    title: 'InfoAcadémica - Admisiones',
  },
  {
    path: 'registro-academico',
    loadComponent: () =>
      import('./pages/registro-academico/registro-academico').then((m) => m.RegistroAcademico),
    title: 'InfoAcadémica - Registro Académico',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.Contacto),
    title: 'InfoAcadémica - Contacto',
  },
  // Cualquier otra ruta redirige al Home.
  { path: '**', redirectTo: '' },
];
