/**
 * contacto.js
 * Validación del formulario de contacto en el navegador. Como esta
 * entrega es solo de Front End, el formulario no envía datos a un
 * servidor real: valida los campos y muestra un mensaje de confirmación.
 */
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  const alerta = document.getElementById("alerta-envio");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    formulario.classList.remove("was-validated");
    mostrarConfirmacion(alerta);
    formulario.reset();
    formulario.classList.remove("was-validated");
  });
});

function mostrarConfirmacion(alerta) {
  if (!alerta) return;
  alerta.classList.add("mostrar");
  alerta.textContent = "¡Gracias por escribirnos! Hemos recibido tu mensaje.";
  setTimeout(function () {
    alerta.classList.remove("mostrar");
  }, 5000);
}
