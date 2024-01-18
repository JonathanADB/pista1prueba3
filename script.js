"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Muestra un mensaje para indicar que se requiere la interacción del usuario
    alert("¡Haga clic en cualquier lugar para reproducir el audio!");

    // Inicia la animación del canvas automáticamente
    startMatrixAnimation();

    // Reproduce el audio cuando el usuario hace clic o toca
    document.addEventListener("pointerup", function() {
        // Reproduce el audio solo si no se ha reproducido previamente
        if (!miAudio.played.some((time) => time > 0)) {
            miAudio.play();
        }
    });
});

// Crea el objeto de audio
let miAudio = new Audio("galeria/jm_fx_matrix-sound-01-19778.mp3");
miAudio.loop = true;
miAudio.preload = "auto";

miAudio.addEventListener("canplaythrough", function() {
    // No inicia la reproducción aquí, solo cuando el usuario hace clic o toca
    // Esto es para cumplir con las políticas de reproducción automática
    miAudio.play();
});

function startMatrixAnimation() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let str = ["B", " ", "I", " ", "L", " ", "B", " ", "O", " ", "S", " ", "T", " ", "A", " ", "C", "", "K"];
    let matrix = str.sort();
    let font = 10;
    let col = width / font;
    let arr = [];

    for (let i = 0; i < col; i++) {
        arr[i] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#9400D3";
        ctx.font = `${font}px system-iu`;

        for (let i = 0; i < arr.length; i++) {
            let txt = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(txt, i * font, arr[i] * font);

            if (arr[i] * font > height && Math.random() > 0.975) {
                arr[i] = 0;
            }

            arr[i]++;
        }

        requestAnimationFrame(draw);
    }

    // Inicia la animación automáticamente
    draw();

    window.addEventListener("resize", function() {
        // Reinicia la animación en caso de cambio de tamaño de la ventana
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        arr = arr.map(() => 1); // Reinicia las posiciones verticales
    });
}