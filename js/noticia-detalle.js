/**
 * noticia-detalle.js
 * Lee el parámetro "id" de la URL (?id=1) y pinta el contenido de la
 * noticia correspondiente en noticia.html usando NoticiasStore. También
 * maneja el botón "Agregar a favoritos", guardando la selección en
 * localStorage para que se recuerde entre visitas (sin backend todavía).
 */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof NoticiasStore === "undefined") return;

  const parametros = new URLSearchParams(window.location.search);
  const idSolicitado = parseInt(parametros.get("id"), 10);
  const noticia = NoticiasStore.obtenerPorId(idSolicitado) || NoticiasStore.obtenerTodas()[0];

  if (!noticia) {
    mostrarNoEncontrada();
    return;
  }

  pintarNoticia(noticia);
  configurarFavorito(noticia.id);
});

function mostrarNoEncontrada() {
  const titulo = document.getElementById("noticia-titulo");
  const cuerpo = document.getElementById("noticia-cuerpo");
  const imagen = document.getElementById("noticia-imagen");
  const boton = document.getElementById("btn-favorito");

  if (imagen) imagen.style.display = "none";
  if (boton) boton.style.display = "none";
  if (titulo) titulo.textContent = "Noticia no encontrada";
  if (cuerpo) {
    cuerpo.innerHTML =
      '<p class="cuerpo">La noticia que buscas no existe o fue eliminada. ' +
      'Vuelve al <a href="noticias.html">listado de noticias</a>.</p>';
  }
}

function pintarNoticia(noticia) {
  document.title = noticia.titulo + " - InfoAcadémica";

  const imagen = document.getElementById("noticia-imagen");
  const titulo = document.getElementById("noticia-titulo");
  const cuerpo = document.getElementById("noticia-cuerpo");

  if (imagen) {
    imagen.src = noticia.imagen;
    imagen.alt = noticia.titulo;
  }
  if (titulo) {
    titulo.textContent = noticia.titulo;
  }
  if (cuerpo) {
    cuerpo.innerHTML = noticia.cuerpo
      .map((parrafo) => `<p class="cuerpo">${escaparTexto(parrafo)}</p>`)
      .join("");
  }
}

/** Escapa texto para insertarlo de forma segura dentro del HTML. */
function escaparTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto == null ? "" : String(texto);
  return div.innerHTML;
}

function configurarFavorito(idNoticia) {
  const boton = document.getElementById("btn-favorito");
  if (!boton) return;

  const claveStorage = "infoacademica_favoritos";
  const favoritos = obtenerFavoritos(claveStorage);
  const yaEsFavorito = favoritos.includes(idNoticia);
  actualizarBotonFavorito(boton, yaEsFavorito);

  boton.addEventListener("click", function () {
    const listaActual = obtenerFavoritos(claveStorage);
    const indice = listaActual.indexOf(idNoticia);
    let esFavoritoAhora;

    if (indice === -1) {
      listaActual.push(idNoticia);
      esFavoritoAhora = true;
    } else {
      listaActual.splice(indice, 1);
      esFavoritoAhora = false;
    }

    localStorage.setItem(claveStorage, JSON.stringify(listaActual));
    actualizarBotonFavorito(boton, esFavoritoAhora);
  });
}

function obtenerFavoritos(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave)) || [];
  } catch (error) {
    return [];
  }
}

function actualizarBotonFavorito(boton, esFavorito) {
  if (esFavorito) {
    boton.textContent = "★ Guardado en favoritos";
    boton.classList.add("activo");
  } else {
    boton.textContent = "★ Agregar a favoritos";
    boton.classList.remove("activo");
  }
}
