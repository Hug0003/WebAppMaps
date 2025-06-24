// Gestion des modals dans SearchSalle avec canvas
document.addEventListener('DOMContentLoaded', function () {
    initializeSearchSalleModals();
});

// Fonction pour fermer tous les modals
function closeAllModals() {
    const containerPlanInfo = document.querySelectorAll('.container_plan_info');
    containerPlanInfo.forEach(plan => {
        plan.style.display = 'none';
    });
    document.body.classList.remove('bodyBackDesable');
}

// Input search salle
document.getElementById('searchSalleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputValue = document.getElementById('salleInput').value;
    document.getElementById('salleInput').value = "";
    container_infoSalle.forEach(info => {
        const salleNum = info.dataset.sallenum;
        const salleNom = info.dataset.sallenom;
        const salleId = info.dataset.sallelid;
        if (inputValue == salleNum || inputValue == salleNom) {
            info.style.display = "block";
            document.body.classList.add("bodyBackDesable");
            loadModalCanvas(salleId);
        }
    });
});

function initializeSearchSalleModals() {
    // Écouter les clics sur les salles pour ouvrir les modals
    const sallesClick = document.querySelectorAll('.salles_click');
    sallesClick.forEach(salle => {
        salle.addEventListener('click', function (e) {
            e.preventDefault();
            // Vérifier si on clique sur l'icône d'étoile (ou un de ses enfants)
            if (e.target.closest(".iconStar_favori_cartes")) {
                console.log("Clic sur l'icône d'étoile - ne pas ouvrir le modal");
                return; // Sortir de la fonction sans ouvrir le modal
            } else {
                const salleId = this.dataset.salleclickid;
                const modal = document.querySelector(`[data-sallelid="${salleId}"]`);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.classList.add('bodyBackDesable');

                    // Charger le canvas avec l'image et le point
                    loadModalCanvas(salleId);
                }
            }
        });
    });

    // Écouter les clics sur les boutons de fermeture
    const closeButtons = document.querySelectorAll('.closeModal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            closeAllModals();
        });
    });

    // Fermer le modal en cliquant à l'extérieur
    document.addEventListener('click', function (e) {
        // Vérifier si on clique sur un modal ouvert
        const openModal = document.querySelector('.container_plan_info[style*="display: block"]');
        if (openModal) {
            // Si on clique sur le modal lui-même ou ses enfants, ne rien faire
            if (openModal.contains(e.target)) {
                return;
            }

            // Si on clique sur le bouton de fermeture, ne rien faire (géré par l'autre event listener)
            if (e.target.closest('.closeModal')) {
                return;
            }

            // Si on clique sur une carte de salle, ne rien faire (pour permettre l'ouverture)
            if (e.target.closest('.salles_click')) {
                return;
            }

            // Sinon, fermer le modal
            closeAllModals();
        }
    });
}

function loadModalCanvas(salleId) {
    const canvas = document.getElementById(`planCanvas_${salleId}`);
    if (!canvas) return;

    const imagePath = canvas.dataset.imgpath;
    const coordX = parseFloat(canvas.dataset.coordx);
    const coordY = parseFloat(canvas.dataset.coordy);

    if (imagePath) {
        loadImageWithPoint(`planCanvas_${salleId}`, imagePath, coordX, coordY);
    }
}

// Fonction pour charger une image dans un canvas avec un point
function loadImageWithPoint(canvasId, imagePath, pointX, pointY) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
        // Ajuster la taille du canvas à l'image
        canvas.width = img.width;
        canvas.height = img.height;

        // Dessiner l'image
        ctx.drawImage(img, 0, 0);

        // Dessiner et animer le point si les coordonnées sont fournies et valides
        if (pointX !== null && pointY !== null && !isNaN(pointX) && !isNaN(pointY)) {
            animatePoint(canvasId, img, pointX, pointY);
        }
    };

    img.onerror = function () {
        console.error("Erreur de chargement de l'image pour le modal : ", imagePath);
        // Afficher un message d'erreur sur le canvas
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#666";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Erreur de chargement de l'image", canvas.width / 2, canvas.height / 2);
    };

    img.src = imagePath;
}

// Fonction pour dessiner un point sur un canvas avec un rayon donné
function drawPointOnCanvas(canvasId, x, y, radius, color = "#FF0000") {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 5;

    // Dessiner le point
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ajouter une ombre pour plus de visibilité
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.restore();
}

// Fonction pour animer le point
function animatePoint(canvasId, img, x, y) {
    let radius = 20;
    let growing = true;
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function updateRadius() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas pour redessiner
        ctx.drawImage(img, 0, 0); // Redessiner l'image

        if (growing) {
            radius += .3;
            if (radius >= 40) growing = false;
        } else {
            radius -= .3;
            if (radius <= 20) growing = true;
        }

        drawPointOnCanvas(canvasId, x, y, radius);
        requestAnimationFrame(updateRadius);
    }

    updateRadius();
}
