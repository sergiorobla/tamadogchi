"use strict";
// ----PORCENTAJES DE LAS BARRAS----
// ---PORCENTAJES DE TODAS LAS BARRAS---
const porcentajes = document.querySelectorAll(".porcentaje");
// ---PORCENTAJE DE LA BARRA DEL PERRO---
const porcentajePerro = document.querySelector(".porcentajePerro");
// ---NUMERO DEL PORCENTAJE DE LA PARTE SUPERIOR---
const numerosPorcentaje = document.querySelectorAll(".numeroPorcentaje");
// ---BOTONES PARA AUMENTAR EL PORCENTAJE---
const aumentarAnchoBotones = document.querySelectorAll(".aumentar");
// ---IMAGEN DEL PERRO---
const imagenPerro = document.getElementById("imagenPerro");
// ----FUNCIONES----
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
            }
            else if (anchoActual > 50) {
                porcentaje.style.backgroundColor = "green";
            }
            else if (anchoActual <= 25) {
                porcentaje.style.backgroundColor = "red";
            }
        }
    });
    if (todosEnCero) {
        clearInterval(intervalo);
    }
}
// ---FUNCION PARA DARLE UN TIEMPO DE DISMINUCION AL PORCENTAJE---
const intervalo = setInterval(function () {
    disminuirAncho();
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
// ---FUNCION PARA AUMENTAR EL PORCENTAJE DE LAS BARRAS GENERALES---
aumentarAnchoBotones.forEach((boton) => {
    boton.addEventListener("click", function () {
        const porcentaje = boton.parentElement?.querySelector(".porcentaje");
        let anchoActual = parseInt(porcentaje.style.width) || 0;
        if (anchoActual < 100) {
            anchoActual += 5;
            porcentaje.style.width = Math.min(anchoActual, 100) + "%";
        }
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
                setTimeout(function () {
                    imagenPerro.setAttribute("src", srcOriginal);
                }, 400);
            });
        });
    }
}
