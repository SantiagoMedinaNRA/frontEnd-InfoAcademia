import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Barra de navegación superior, presente en todas las vistas.
 * Usa RouterLink para navegar sin recargar y RouterLinkActive para
 * resaltar el enlace de la ruta actual (equivalente al antiguo main.js).
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  /** Controla el colapso del menú en pantallas pequeñas. */
  menuAbierto = false;

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
