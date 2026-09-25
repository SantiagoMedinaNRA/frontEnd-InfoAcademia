/**
 * noticias.js
 * Genera dinámicamente las tarjetas de noticias en Home y en la página
 * de Listado de Noticias, a partir de los datos de NoticiasStore
 * (noticias-data.js), que a su vez lee desde localStorage.
 *
 * Uso:
 *   <div id="contenedor-noticias" data-limite="3"></div>
 *   <script src="js/noticias-data.js"></script>
 *   <script src="js/noticias.js"></script>
 */
document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedor-noticias");
  if (!contenedor || typeof NoticiasStore === "undefined") return;

  const todas = NoticiasStore.obtenerTodas();
  const limite = parseInt(contenedor.dataset.limite, 10) || todas.length;
  const noticiasAMostrar = todas.slice(0, limite);

  if (noticiasAMostrar.length === 0) {
    contenedor.innerHTML =
      '<p class="text-center text-muted col-12">Aún no hay noticias publicadas.</p>';
    return;
  }

  contenedor.innerHTML = noticiasAMostrar.map(crearTarjetaHTML).join("");
});

/** Escapa texto para insertarlo de forma segura dentro del HTML. */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto == null ? "" : String(texto);
  return div.innerHTML;
}

function crearTarjetaHTML(noticia) {
  const titulo = escaparHTML(noticia.titulo);
  const resumen = escaparHTML(noticia.resumen);
  const imagen = escaparHTML(noticia.imagen);
  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card noticia-card shadow-sm">
        <img src="${imagen}" alt="${titulo}">
        <div class="card-body">
          <h3 class="card-title">${titulo}</h3>
          <p class="card-text">${resumen}</p>
          <a class="btn btn-oscuro" href="noticia.html?id=${noticia.id}">ver más</a>
        </div>
      </div>
    </div>
  `;
}
