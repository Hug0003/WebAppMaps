const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const addEtageToSalle = document.getElementById('addEtageToSalle');
const container = document.querySelector('.canvas-container');

let scale = 0.3;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2;
const MAX_TRANSLATE = 100;
let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;
let lastTranslateX = 0;
let lastTranslateY = 0;
let currentImage = null;
let listCoord = {};

addEtageToSalle.addEventListener('change', function () {
    const selectedOption = addEtageToSalle.options[addEtageToSalle.selectedIndex];
    const imagePath = selectedOption.dataset.imgpath;
    console.log("Chemin de l'image :", imagePath);
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

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.scale(scale, scale);
    ctx.translate(translateX / scale, translateY / scale);

    const x = -currentImage.width / 2;
    const y = -currentImage.height / 2;
    ctx.drawImage(currentImage, x, y);

    drawPoints();

    ctx.restore();
}

function drawPoints() {
    ctx.save();
    ctx.fillStyle = "#FF0000";
    const radius = 20;
    // Bas-droite
    ctx.beginPath();
    ctx.arc(-820, 1250, radius, 0, Math.PI * 2, true);
    ctx.fill();
    // Haut-gauche
    ctx.beginPath();
    ctx.arc(820, -1250, radius, 0, Math.PI * 2, true);
    ctx.fill();
    // Haut-droite
    ctx.beginPath();
    ctx.arc(820, 1250, radius, 0, Math.PI * 2, true);
    ctx.fill();
    // Bas-gauche
    ctx.beginPath();
    ctx.arc(-820, -1250, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}

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

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    listCoord[Object.keys(listCoord).length] = [x, y];

    console.log(`Coordonnées du clic (canvas): x: ${x}, y: ${y}`);
    console.log("Liste des coordonnées :", listCoord);

    return listCoord;
}

function updateHiddenInput() {
    document.getElementById('coordonneesInput').value = JSON.stringify(listCoord);
}

canvas.addEventListener('dblclick', function (event) {
    getCursorPosition(canvas, event);
    drawImage();
    updateHiddenInput();
});


//let nbClick = 0;
//let listCoord = {};

//function getCursorPosition(canvas, event) {
//    const rect = canvas.getBoundingClientRect();
//    const x = event.clientX - rect.left;
//    const y = event.clientY - rect.top;

//    // Stocker les coordonnées dans le dictionnaire
//    listCoord[nbClick] = [x, y];

//    console.log(`Coordonnées du clic ${nbClick}: x: ${x}, y: ${y}`);
//    console.log("Liste des coordonnées :", listCoord);

//    return listCoord;
//}

//canvas.addEventListener('dblclick', function (event) {
//    if (nbClick < 2) {
//        nbClick++;
//        getCursorPosition(canvas, event);
//    } else {
//        console.log("Vous avez atteint le nombre maximum de clics.");
//    }


//});

