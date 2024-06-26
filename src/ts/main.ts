// ----PORCENTAJES DE LAS BARRAS----
// ---TODAS LAS BARRAS DE PORCENTAJES---
const barraPorcentaje = document.querySelectorAll(
  ".barraPorcentaje"
) as NodeListOf<HTMLElement>;
// ------------------------------
const barraPorcentajePerro: HTMLElement | null = document.querySelector(
  ".barraPorcentajePerro"
);
// ---TODOS LOS PORCENTAJES---
const porcentajes = document.querySelectorAll(
  ".porcentaje"
) as NodeListOf<HTMLElement>;
// ------------------------------
const porcentajePerro = document.querySelector(
  ".porcentajePerro"
) as HTMLElement;
// ---TODOS LOS NUMEROS DE PORCENTAJES ---
const numerosPorcentaje = document.querySelectorAll(
  ".numeroPorcentaje"
) as NodeListOf<HTMLElement>;
// ------------------------------
const numerPorcentajePerro = document.querySelector(
  ".numeroPorcentajePerro"
) as HTMLElement;
// ---TODOS LOS BOTONES PARA AUMENTAR EL PORCENTAJE---
const aumentarAnchoBotones = document.querySelectorAll(
  ".aumentar"
) as NodeListOf<HTMLImageElement>;
// ---IMAGEN DEL PERRO---
const imagenPerro = document.getElementById("imagenPerro") as HTMLImageElement;
// ------------------------------
const imagenPerroKill = document.getElementById(
  "imagenPerroKill"
) as HTMLImageElement;
// ------------------------------
const sonidoPerro: HTMLMediaElement | null = document.getElementById(
  "sonidoPerro"
) as HTMLMediaElement;
// ---IMAGEN DE REVIVIR---
const revivir: HTMLElement | null = document.querySelector(".revivir");
// ---TODOS LOS H1 DE LA PAGINA---
const titulos = document.getElementsByTagName("h1");
const titulosArray = Array.from(titulos);
// Variable para controlar si se está haciendo clic en un botón de aumento de porcentaje
let clickActivo = false;

// ----FUNCIONES----
// ---FUNCION PARA EL SONIDO---
function sonido() {
  if (
    sonidoPerro !== null &&
    sonidoPerro instanceof HTMLElement &&
    sonidoPerro.play
  ) {
    sonidoPerro.play();
  } else {
    console.error("No se pudo reproducir el sonido del perro.");
  }
}
// ---FUNCION PARA DISMINUIR EL ANCHO DE LAS BARRAS GENERALES---
function disminuirAncho() {
  let todosEnCero = true;
  porcentajes.forEach((porcentaje, index) => {
    let anchoActual = parseInt(porcentaje.style.width) || 100;
    if (anchoActual > 0) {
      todosEnCero = false;
      anchoActual -= 1;
      porcentaje.style.width = anchoActual + "%";
      numerosPorcentaje[index].innerHTML = anchoActual + "%";
      if (anchoActual <= 50 && anchoActual > 25) {
        porcentaje.style.backgroundColor = "orange";
      } else if (anchoActual > 50) {
        porcentaje.style.backgroundColor = "green";
      } else if (anchoActual <= 25) {
        porcentaje.style.backgroundColor = "red";
      }
    }
  });
  if (todosEnCero) {
    clearInterval(intervalo);
  }
}

// ---FUNCION PARA DISMINUIR EL ANCHO DEL PORCENTAJE DEL PERRO---
function disminuirAnchoPerro() {
  const numerPorcentajePerro = document.querySelector(
    ".numeroPorcentajePerro"
  ) as HTMLElement;
  let anchoActual = parseInt(porcentajePerro.style.width) || 100;
  if (anchoActual > 0 && !clickActivo) {
    anchoActual -= 2;
    porcentajePerro.style.width = anchoActual + "%";
    numerPorcentajePerro.innerHTML = anchoActual + "%";
    if (anchoActual <= 50 && anchoActual > 25) {
      porcentajePerro.style.backgroundColor = "orange";
    } else if (anchoActual <= 25) {
      porcentajePerro.style.backgroundColor = "red";
    } else {
      porcentajePerro.style.backgroundColor = "green";
    }
    if (anchoActual <= 0) {
      imagenPerro.style.display = "none";
      imagenPerroKill.style.display = "block";
      if (barraPorcentajePerro !== null) {
        barraPorcentajePerro.style.display = "none";
      }
      barraPorcentaje.forEach((elemento: HTMLElement) => {
        elemento.style.display = "none";
      });
      numerosPorcentaje.forEach((elemento: HTMLElement) => {
        elemento.style.display = "none";
      });
      numerPorcentajePerro.style.display = "none";
      if (revivir !== null) {
        revivir.style.display = "block";
      }
      aumentarAnchoBotones.forEach((elemento: HTMLElement) => {
        elemento.style.display = "none";
      });
      titulosArray.forEach((elemento: HTMLElement) => {
        elemento.style.display = "none";
      });
    }
  }
}

// ---FUNCION PARA AUMENTAR EL PORCENTAJE DE LAS BARRAS GENERALES---
aumentarAnchoBotones.forEach((boton) => {
  boton.addEventListener("click", function () {
    clickActivo = true; // Se establece a true cuando se hace clic en un botón de aumento de porcentaje

    const porcentaje = boton.parentElement?.querySelector(
      ".porcentaje"
    ) as HTMLElement;
    let anchoActual = parseInt(porcentaje.style.width) || 0;
    if (anchoActual < 100) {
      anchoActual += 5;
      porcentaje.style.width = Math.min(anchoActual, 100) + "%";
      let anchoActualPerro = parseInt(porcentajePerro.style.width) || 0;
      if (anchoActualPerro < 100) {
        anchoActualPerro += Math.floor(Math.random() * 5);
        porcentajePerro.style.width = Math.min(anchoActualPerro, 100) + "%";
        numerPorcentajePerro.innerHTML = Math.min(anchoActualPerro, 100) + "%";
        if (anchoActualPerro <= 50 && anchoActualPerro > 25) {
          porcentajePerro.style.backgroundColor = "orange";
        } else if (anchoActualPerro <= 25) {
          porcentajePerro.style.backgroundColor = "red";
        } else {
          porcentajePerro.style.backgroundColor = "green";
        }
      }
    }

    // Se restablece a false después de un breve retraso para simular que el clic ha terminado
    setTimeout(() => {
      clickActivo = false;
    }, 200);
  });
});

// ---FUNCION PARA QUE EL PERRO SALTE AL TOCARLO---
if (imagenPerro) {
  const srcOriginal = imagenPerro.getAttribute("original");
  const srcCambiada = imagenPerro.getAttribute("cambiada");
  if (srcOriginal && srcCambiada) {
    imagenPerro.addEventListener("click", function () {
      setTimeout(function () {
        imagenPerro.setAttribute("src", srcCambiada);
        sonido();
        setTimeout(function () {
          imagenPerro.setAttribute("src", srcOriginal);
        }, 400);
      });
    });
  }
}

// ---FUNCION PARA DARLE UN TIEMPO DE DISMINUCION AL PORCENTAJE---
const intervalo = setInterval(function () {
  disminuirAncho();
  disminuirAnchoPerro();
  let algunoMayorQueCero = false;
  porcentajes.forEach((porcentaje) => {
    if (parseInt(porcentaje.style.width) > 0) {
      algunoMayorQueCero = true;
    }
  });
  if (!algunoMayorQueCero) {
    clearInterval(intervalo);
  }
}, 400);
