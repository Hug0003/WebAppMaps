const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const addEtageToSalle = document.getElementById('addEtageToSalle');
const container = document.querySelector('.canvas-container');

let scale = 0.3;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2;
const MAX_TRANSLATE = 100; // Limite de déplacement en pixels (1rem = 16px, donc environ 6rem)
let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;
let lastTranslateX = 0;
let lastTranslateY = 0;
let currentImage = null;

addEtageToSalle.addEventListener('change', function () {
    const selectedOption = addEtageToSalle.options[addEtageToSalle.selectedIndex];
    const imagePath = selectedOption.dataset.imgpath;
    console.log("Chemin de l'image :", imagePath); // Pour déboguer
    if (imagePath) {
        loadImageOnCanvas(imagePath);
    }
});

function loadImageOnCanvas(imagePath) {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = function () {
        currentImage = img;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspectRatio = img.height / img.width;

        canvas.width = containerWidth;
        canvas.height = containerHeight;

        scale = 0.3;
        translateX = 0;
        translateY = 0;

        drawImage();
    };

    img.onerror = function () {
        console.error("Erreur de chargement de l'image : ", imagePath);
        alert("Erreur de chargement de l'image. Veuillez vérifier le chemin de l'image.");
    };

    img.src = imagePath;
}

function drawImage() {
    if (!currentImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Déplacer au centre du canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Appliquer la rotation
    ctx.rotate(-Math.PI / 2);

    // Appliquer le zoom
    ctx.scale(scale, scale);

    // Appliquer la translation
    ctx.translate(translateX / scale, translateY / scale);

    // Dessiner l'image centrée
    const x = -currentImage.width / 2;
    const y = -currentImage.height / 2;
    ctx.drawImage(currentImage, x, y);

    ctx.restore();
}


// Charger l'image au chargement initial
window.onload = function () {
    if (addEtageToSalle.selectedIndex >= 0) {
        const selectedOption = addEtageToSalle.options[addEtageToSalle.selectedIndex];
        const imagePath = selectedOption.dataset.imgpath;
        if (imagePath) {
            loadImageOnCanvas(imagePath);
        }
    }
};

let nbClick = 0;
let listCoord = {};

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Stocker les coordonnées dans le dictionnaire
    listCoord[nbClick] = [x, y];

    console.log(`Coordonnées du clic ${nbClick}: x: ${x}, y: ${y}`);
    console.log("Liste des coordonnées :", listCoord);

    return listCoord;
}

canvas.addEventListener('dblclick', function (event) {
    if (nbClick < 2) {
        nbClick++;
        getCursorPosition(canvas, event);
    } else {
        console.log("Vous avez atteint le nombre maximum de clics.");
    }


});
