"use strict";
// ----PORCENTAJES DE LAS BARRAS----
// ---TODAS LAS BARRAS DE PORCENTAJES---
const barraPorcentaje = document.querySelectorAll(".barraPorcentaje");
// ------------------------------
const barraPorcentajePerro = document.querySelector(".barraPorcentajePerro");
// ---TODOS LOS PORCENTAJES---
const porcentajes = document.querySelectorAll(".porcentaje");
// ------------------------------
const porcentajePerro = document.querySelector(".porcentajePerro");
// ---TODOS LOS NUMEROS DE PORCENTAJES ---
const numerosPorcentaje = document.querySelectorAll(".numeroPorcentaje");
// ------------------------------
const numerPorcentajePerro = document.querySelector(".numeroPorcentajePerro");
// ---TODOS LOS BOTONES PARA AUMENTAR EL PORCENTAJE---
const aumentarAnchoBotones = document.querySelectorAll(".aumentar");
// ---IMAGEN DEL PERRO---
const imagenPerro = document.getElementById("imagenPerro");
// ------------------------------
const imagenPerroKill = document.getElementById("imagenPerroKill");
// ------------------------------
const sonidoPerro = document.getElementById("sonidoPerro");
// ---IMAGEN DE REVIVIR---
const revivir = document.querySelector(".revivir");
// ---TODOS LOS H1 DE LA PAGINA---
const titulos = document.getElementsByTagName("h1");
const titulosArray = Array.from(titulos);
// Variable para controlar si se está haciendo clic en un botón de aumento de porcentaje
let clickActivo = false;
// ----FUNCIONES----
// ---FUNCION PARA EL SONIDO---
function sonido() {
    if (sonidoPerro !== null &&
        sonidoPerro instanceof HTMLElement &&
        sonidoPerro.play) {
        sonidoPerro.play();
    }
    else {
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
// ---FUNCION PARA DISMINUIR EL ANCHO DEL PORCENTAJE DEL PERRO---
function disminuirAnchoPerro() {
    const numerPorcentajePerro = document.querySelector(".numeroPorcentajePerro");
    let anchoActual = parseInt(porcentajePerro.style.width) || 100;
    if (anchoActual > 0 && !clickActivo) {
        anchoActual -= 2;
        porcentajePerro.style.width = anchoActual + "%";
        numerPorcentajePerro.innerHTML = anchoActual + "%";
        if (anchoActual <= 50 && anchoActual > 25) {
            porcentajePerro.style.backgroundColor = "orange";
        }
        else if (anchoActual <= 25) {
            porcentajePerro.style.backgroundColor = "red";
        }
        else {
            porcentajePerro.style.backgroundColor = "green";
        }
        if (anchoActual <= 0) {
            imagenPerro.style.display = "none";
            imagenPerroKill.style.display = "block";
            if (barraPorcentajePerro !== null) {
                barraPorcentajePerro.style.display = "none";
            }
            barraPorcentaje.forEach((elemento) => {
                elemento.style.display = "none";
            });
            numerosPorcentaje.forEach((elemento) => {
                elemento.style.display = "none";
            });
            numerPorcentajePerro.style.display = "none";
            if (revivir !== null) {
                revivir.style.display = "block";
            }
            aumentarAnchoBotones.forEach((elemento) => {
                elemento.style.display = "none";
            });
            titulosArray.forEach((elemento) => {
                elemento.style.display = "none";
            });
        }
    }
}
// ---FUNCION PARA AUMENTAR EL PORCENTAJE DE LAS BARRAS GENERALES---
aumentarAnchoBotones.forEach((boton) => {
    boton.addEventListener("click", function () {
        clickActivo = true; // Se establece a true cuando se hace clic en un botón de aumento de porcentaje
        const porcentaje = boton.parentElement?.querySelector(".porcentaje");
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
                }
                else if (anchoActualPerro <= 25) {
                    porcentajePerro.style.backgroundColor = "red";
                }
                else {
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
