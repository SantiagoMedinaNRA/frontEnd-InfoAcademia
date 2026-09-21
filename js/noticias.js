/**
 * noticias.js
 * Genera dinámicamente las tarjetas de noticias en Home y en la página
 * de Listado de Noticias, a partir del arreglo NOTICIAS (noticias-data.js).
 *
 * Uso:
 *   <div id="contenedor-noticias" data-limite="3"></div>
 *   <script src="js/noticias-data.js"></script>
 *   <script src="js/noticias.js"></script>
 */
document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedor-noticias");
  if (!contenedor || typeof NOTICIAS === "undefined") return;

  const limite = parseInt(contenedor.dataset.limite, 10) || NOTICIAS.length;
  const noticiasAMostrar = NOTICIAS.slice(0, limite);

  contenedor.innerHTML = noticiasAMostrar.map(crearTarjetaHTML).join("");
});

function crearTarjetaHTML(noticia) {
  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card noticia-card shadow-sm">
        <img src="${noticia.imagen}" alt="${noticia.titulo}">
        <div class="card-body">
          <h3 class="card-title">${noticia.titulo}</h3>
          <p class="card-text">${noticia.resumen}</p>
          <a class="btn btn-oscuro" href="noticia.html?id=${noticia.id}">ver más</a>
        </div>
      </div>
    </div>
  `;
}
