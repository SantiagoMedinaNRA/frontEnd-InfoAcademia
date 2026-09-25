/**
 * favoritos.js
 * Muestra la lista personalizada de noticias que el usuario marcó como
 * favoritas. Los ids de favoritos se guardan en localStorage
 * ('infoacademica_favoritos') desde el detalle de la noticia; aquí se
 * cruzan con NoticiasStore para pintar las tarjetas y permitir quitarlas.
 */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof NoticiasStore === "undefined") return;

  const contenedor = document.getElementById("contenedor-favoritos");
  if (!contenedor) return;

  pintarFavoritos(contenedor);

  // Permite quitar un favorito directamente desde esta vista.
  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-quitar]");
    if (!boton) return;
    quitarFavorito(parseInt(boton.dataset.quitar, 10));
    pintarFavoritos(contenedor);
  });
});

const CLAVE_FAVORITOS = "infoacademica_favoritos";

function obtenerIdsFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || [];
  } catch (error) {
    return [];
  }
}

function quitarFavorito(id) {
  const ids = obtenerIdsFavoritos().filter((f) => f !== id);
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(ids));
}

function pintarFavoritos(contenedor) {
  const ids = obtenerIdsFavoritos();

  // Cruza los ids guardados con las noticias que aún existen.
  const noticias = ids
    .map((id) => NoticiasStore.obtenerPorId(id))
    .filter((noticia) => noticia !== null);

  if (noticias.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center estado-vacio">
        <div class="icono">★</div>
        <p class="text-muted">Todavía no tienes noticias favoritas.</p>
        <a href="noticias.html" class="btn btn-oscuro mt-2">Explorar noticias</a>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = noticias.map(crearTarjetaFavoritoHTML).join("");
}

function crearTarjetaFavoritoHTML(noticia) {
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
          <div class="d-flex gap-2 flex-wrap">
            <a class="btn btn-oscuro" href="noticia.html?id=${noticia.id}">ver más</a>
            <button type="button" class="btn btn-favorito" data-quitar="${noticia.id}">Quitar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/** Escapa texto para insertarlo de forma segura dentro del HTML. */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto == null ? "" : String(texto);
  return div.innerHTML;
}
