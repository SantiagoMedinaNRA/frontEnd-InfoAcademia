/**
 * noticia-detalle.js
 * Lee el parámetro "id" de la URL (?id=1) y pinta el contenido de la
 * noticia correspondiente en noticia.html. También maneja el botón
 * "Agregar a favoritos", guardando la selección en localStorage para
 * que se recuerde entre visitas (sin necesidad de backend todavía).
 */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof NOTICIAS === "undefined") return;

  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get("id"), 10) || NOTICIAS[0].id;
  const noticia = NOTICIAS.find((n) => n.id === id) || NOTICIAS[0];

  pintarNoticia(noticia);
  configurarFavorito(noticia.id);
});

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
    cuerpo.innerHTML = noticia.cuerpo.map((parrafo) => `<p class="cuerpo">${parrafo}</p>`).join("");
  }
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
