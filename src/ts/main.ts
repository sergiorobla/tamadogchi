const porcentajes = document.querySelectorAll(
  ".porcentaje"
) as NodeListOf<HTMLElement>;
const aumentarAnchoBotones = document.querySelectorAll(
  ".aumentar"
) as NodeListOf<HTMLImageElement>;
const numerosPorcentaje = document.querySelectorAll(
  ".numeroPorcentaje"
) as NodeListOf<HTMLElement>;

function disminuirAncho() {
  let llegoAlCien = true;
  porcentajes.forEach((porcentaje, index) => {
    let anchoActual = parseInt(porcentaje.style.width) || 100;
    if (anchoActual > 0) {
      llegoAlCien = false;
      anchoActual -= 1;
      porcentaje.style.width = anchoActual + "%";
      numerosPorcentaje[index].innerHTML = anchoActual + "%";
    }
  });

  if (llegoAlCien) {
    clearInterval(intervalo);
  }
}

const intervalo = setInterval(disminuirAncho, 400);

aumentarAnchoBotones.forEach((boton, index) => {
  boton.addEventListener("click", function () {
    const porcentaje = boton.parentElement?.querySelector(
      ".porcentaje"
    ) as HTMLElement;

    let anchoActual = parseInt(porcentaje.style.width) || 100;

    if (anchoActual < 100) {
      // Solo si el ancho actual es menor que 100, aumentamos el ancho
      anchoActual += 5;
    } else {
      anchoActual = 0;
    }

    porcentaje.style.width = Math.min(anchoActual, 95) + "%";
    numerosPorcentaje[index].innerHTML = anchoActual + "%";
  });
});

const imagenPerro = document.getElementById("imagenPerro");

if (imagenPerro) {
  const srcOriginal = imagenPerro.getAttribute("original");
  const srcCambiada = imagenPerro.getAttribute("cambiada");

  if (srcOriginal && srcCambiada) {
    imagenPerro.addEventListener("click", function () {
      imagenPerro.setAttribute("src", srcCambiada);

      setTimeout(function () {
        imagenPerro.setAttribute("src", srcOriginal);
      }, 500);
    });
  }
}
