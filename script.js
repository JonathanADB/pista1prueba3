"use strict";

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width, height, col;
let str = "BILBOSTACK BILBOSTACK";
let matrix = str.split("");
let font = 5;
let arr = [];
let audioPlayed = false;

// Función para reproducir el audio
function playAudio() {
    let miAudio = document.getElementById("miAudio");
    let sources = miAudio.getElementsByTagName("source");

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

        // Reproduce el audio directamente después de cargarlo
        audio.play();

        // Marca que el audio ha sido reproducido
        audioPlayed = true;

        // Sale del bucle si el audio se ha reproducido exitosamente
        if (audioPlayed) {
            break;
        }
    }
}

const initializeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    col = Math.floor(width / font);

    for (let i = 0; i < col; i++) {
        arr[i] = 1;
    }
};

const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#ABDB2A";
    ctx.font = `${font}px system-ui`;

    for (let i = 0; i < arr.length; i++) {
        let txt = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(txt, i * font, arr[i] * font);

        if (arr[i] * font > height && Math.random() > 0.975) {
            arr[i] = 0;
        }

        arr[i]++;
    }
};

const handleResize = () => {
    initializeCanvas();
    draw(); // Vuelve a dibujar el fondo matrix después de cambiar el tamaño del canvas
};

initializeCanvas();
setInterval(draw, 20);

// Inicia la animación automáticamente
draw();

// Reproduce el audio cuando el usuario hace clic o toca
document.addEventListener("click", function () {
    if (!audioPlayed) {
        playAudio();
    }
});

window.addEventListener("resize", handleResize);