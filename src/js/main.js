"use strict";
const porcentajes = document.querySelectorAll(".porcentaje");
const aumentarAnchoBotones = document.querySelectorAll(".aumentar");
const numerosPorcentaje = document.querySelectorAll(".numeroPorcentaje");
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
        const porcentaje = boton.parentElement?.querySelector(".porcentaje");
        let anchoActual = parseInt(porcentaje.style.width) || 100;
        if (anchoActual < 100) { // Solo si el ancho actual es menor que 100, aumentamos el ancho
            anchoActual += 5;
        }
        else {
            anchoActual = 0;
        }
        porcentaje.style.width = Math.min(anchoActual, 95) + "%";
        numerosPorcentaje[index].innerHTML = anchoActual + "%";
    });
});