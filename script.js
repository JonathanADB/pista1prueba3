"use strict";

// Variable para rastrear si el audio ya se reprodujo
let audioPlayed = false;

document.addEventListener("DOMContentLoaded", function() {
    // Muestra un mensaje para indicar que se requiere la interacción del usuario
    alert("¡Pulse ok y presiona la pantala para activar el audio!");

    // Inicia la animación del canvas automáticamente
    startMatrixAnimation();

    // Reproduce el audio cuando el usuario hace clic o toca
    document.addEventListener("pointerup", function() {
        // Reproduce el audio solo si no se ha reproducido previamente
        if (!audioPlayed) {
            playAudio();
        }
    });
});

// Función para reproducir el audio
function playAudio() {
    let miAudio = document.getElementById("miAudio");
    let sources = miAudio.getElementsByTagName("source");

     // Intenta cargar y reproducir la primera fuente de audio compatible
     for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        let audioType = source.type;
        let audioSrc = source.src;

        let audio = new Audio();
        audio.src = audioSrc;
        audio.type = audioType;
        audio.loop = true;
        audio.preload = "auto";

        // Intenta cargar el audio
        audio.load();

        // Escucha el evento 'canplaythrough' para reproducir cuando esté listo
        audio.addEventListener("canplaythrough", function() {
            audio.play();
            // Marca que el audio ha sido reproducido
            audioPlayed = true;
        });

        // Sale del bucle si el audio se ha reproducido exitosamente
        if (audioPlayed) {
            break;
        }
    }
}


//funcion para iniciar canva
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
