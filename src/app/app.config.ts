import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';

/**
 * Configuración raíz de la aplicación (standalone).
 * - provideRouter con restauración de scroll para que al navegar la vista
 *   vuelva al inicio de la página.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
  ],
};
