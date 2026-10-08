import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Pie de página común a todas las vistas. El año se calcula en el componente
 * (property binding) en lugar de con JavaScript suelto como en la versión HTML.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  /** Año actual mostrado en el aviso de derechos reservados. */
  readonly anio = new Date().getFullYear();
}
