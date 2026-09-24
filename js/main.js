/**
 * main.js
 * Lógica general compartida por todas las páginas del sitio:
 * - Resalta el enlace activo del menú de navegación.
 * - Inserta el año actual en el footer (si existe el elemento #anio).
 */
document.addEventListener("DOMContentLoaded", function () {
  resaltarEnlaceActivo();
  actualizarAnioFooter();
});

function resaltarEnlaceActivo() {
  const rutaActual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-infoacademica .nav-link").forEach(function (enlace) {
    const href = enlace.getAttribute("href");
    if (href === rutaActual) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });
}

function actualizarAnioFooter() {
  const anio = document.getElementById("anio");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
}
