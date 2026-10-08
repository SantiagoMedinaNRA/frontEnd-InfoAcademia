import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

/**
 * Componente raíz. Define el layout común (navbar + contenido + footer).
 * El <router-outlet> renderiza la página correspondiente a la ruta activa.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
