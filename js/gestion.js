/**
 * gestion.js
 * Mini CRUD de noticias (crear / eliminar) sobre localStorage a través de
 * NoticiasStore (noticias-data.js). Es una funcionalidad solo de Front End:
 * no envía datos a ningún servidor.
 *
 * - Crear: valida el formulario y agrega la noticia al almacenamiento.
 * - Eliminar: quita la noticia seleccionada (con confirmación).
 * - Restaurar: vuelve a las noticias de ejemplo originales.
 */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof NoticiasStore === "undefined") return;

  const formulario = document.getElementById("form-noticia");
  const alerta = document.getElementById("alerta-gestion");
  const lista = document.getElementById("lista-gestion");
  const botonRestaurar = document.getElementById("btn-restaurar");

  pintarLista(lista);

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
      }

      NoticiasStore.crear({
        titulo: formulario.titulo.value,
        resumen: formulario.resumen.value,
        imagen: formulario.imagen.value,
        cuerpo: formulario.cuerpo.value
      });

      formulario.reset();
      formulario.classList.remove("was-validated");
      mostrarAlerta(alerta, "¡Noticia publicada! Ya aparece en el listado y en el Home.");
      pintarLista(lista);
    });
  }

  if (botonRestaurar) {
    botonRestaurar.addEventListener("click", function () {
      const confirmar = window.confirm(
        "Esto reemplazará las noticias actuales por las de ejemplo. ¿Continuar?"
      );
      if (!confirmar) return;
      NoticiasStore.restaurar();
      mostrarAlerta(alerta, "Se restauraron las noticias de ejemplo.");
      pintarLista(lista);
    });
  }

  // Delegación de eventos para los botones "Eliminar".
  if (lista) {
    lista.addEventListener("click", function (evento) {
      const boton = evento.target.closest("[data-eliminar]");
      if (!boton) return;

      const id = boton.dataset.eliminar;
      const titulo = boton.dataset.titulo || "esta noticia";
      const confirmar = window.confirm('¿Eliminar "' + titulo + '"?');
      if (!confirmar) return;

      NoticiasStore.eliminar(id);
      pintarLista(lista);
      mostrarAlerta(alerta, "Noticia eliminada.");
    });
  }
});

/** Dibuja la lista de noticias con su botón de eliminar. */
function pintarLista(lista) {
  if (!lista) return;
  const noticias = NoticiasStore.obtenerTodas();

  if (noticias.length === 0) {
    lista.innerHTML =
      '<p class="text-muted mb-0">No hay noticias. Crea una con el formulario o restaura las de ejemplo.</p>';
    return;
  }

  lista.innerHTML = noticias.map(crearFilaHTML).join("");
}

function crearFilaHTML(noticia) {
  const titulo = escaparHTML(noticia.titulo);
  const resumen = escaparHTML(noticia.resumen);
  return `
    <div class="gestion-item">
      <div class="gestion-item-info">
        <a href="noticia.html?id=${noticia.id}" class="gestion-item-titulo">${titulo}</a>
        <p class="gestion-item-resumen">${resumen}</p>
      </div>
      <button type="button" class="btn btn-eliminar" data-eliminar="${noticia.id}" data-titulo="${titulo}">
        Eliminar
      </button>
    </div>
  `;
}

function mostrarAlerta(alerta, mensaje) {
  if (!alerta) return;
  alerta.textContent = mensaje;
  alerta.classList.add("mostrar");
  setTimeout(function () {
    alerta.classList.remove("mostrar");
  }, 4000);
}

/** Escapa texto para insertarlo de forma segura dentro del HTML. */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto == null ? "" : String(texto);
  return div.innerHTML;
}
