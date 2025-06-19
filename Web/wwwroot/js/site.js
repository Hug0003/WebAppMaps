const formSelectEtage = document.querySelector("#etageSelect");
const formSelectFavorie = document.querySelector("#favoriSelect");
const formSelectType = document.querySelector("#typeSalle");
const formSelectAttribut = document.querySelector("#attributSalle");
const salleClick = document.querySelectorAll(".salles_click");
const container_infoSalle = document.querySelectorAll('.container_plan_info');
const scrollContainer = document.querySelector(".container_ListSalle");
const body = document.querySelector("body");


const box_iconFavori = document.querySelectorAll(".box_iconFavori");
const box_iconFavori_visu = document.querySelectorAll(".box_iconFavori_visuSalle");

const containerPlanInfo = document.querySelectorAll(".container_plan_info");
const closeModal = document.querySelectorAll(".closeModal");







//ajouter des cookies
function setCookie(nomCookie, nouvelElement) {
    let listeStringRecuperee = getCookie(nomCookie);

    let listeRecuperee = listeStringRecuperee ? JSON.parse(listeStringRecuperee) : [];

    if (!listeRecuperee.includes(nouvelElement)) {
        listeRecuperee.push(nouvelElement);
    } else {
        const index = listeRecuperee.indexOf(nouvelElement);
        listeRecuperee.splice(index, 1)
    }


    let listeMiseAJourJson = JSON.stringify(listeRecuperee);

    let dateDansUnAn = new Date();
    dateDansUnAn.setFullYear(dateDansUnAn.getFullYear() + 1);

    document.cookie = `${nomCookie}=${listeMiseAJourJson}; expires=${dateDansUnAn.toUTCString()}; path=/`;
}



//recuperer les cookies
function getCookie(nom) {
    let nomCookie = nom + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nomCookie) === 0) {
            return cookie.substring(nomCookie.length, cookie.length);
        }
    }
    return "";
}

// formulaire de creation de salle adaptation
function showSpecificFields() {
    var typeSalle = document.getElementById('typeSalle').value;

    document.getElementById('reunionFields').style.display = 'none';
    document.getElementById('pauseFields').style.display = 'none';
    document.getElementById('bubbleFields').style.display = 'none';

    switch (typeSalle) {
        case '1': // Réunion
            document.getElementById('reunionFields').style.display = 'block';
            break;
        case '2': // Pause
            document.getElementById('pauseFields').style.display = 'block';
            break;
        case '3': // Bubble
            document.getElementById('bubbleFields').style.display = 'block';
            break;
    }
}
// Appeler la fonction au chargement de la page
window.onload = showSpecificFields;



// option en fonction du type
formSelectType.addEventListener('change', function () {
    var typeSalle = this.value;

    formSelectAttribut.innerHTML = '<option value="all">-- Tous les attributs --</option>';

    if (typeSalle === 'Pause') {
        var options = [
            { value: 'distributeur', text: 'Distributeur' },
            { value: 'frigo', text: 'Frigo' },
        ];
    } else if (typeSalle === 'Reunion') {
        var options = [
            { value: 'ecran', text: 'Ecran' },
            { value: 'camera', text: 'Camera' },
            { value: 'tableaublanc', text: 'Tableau blanc' },
            { value: 'systemeaudio', text: 'Système audio' }
        ];
    } else if (typeSalle === 'Bubble') {
        var options = [
            { value: 'priseelectrique', text: 'Prise électrique' }
        ];
    } else {
        var options = [
            { value: 'distributeur', text: 'Distributeur' },
            { value: 'frigo', text: 'Frigo' },
            { value: 'ecran', text: 'Ecran' },
            { value: 'camera', text: 'Camera' },
            { value: 'tableaublanc', text: 'Tableau blanc' },
            { value: 'systemeaudio', text: 'Système audio' },
            { value: 'priseelectrique', text: 'Prise électrique' },

        ]
    }

    if (options) {
        options.forEach(function (option) {
            var opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            formSelectAttribut.add(opt);
        });
    }
});




formSelectEtage.addEventListener("change", filterSalles);
formSelectType.addEventListener("change", filterSalles);
formSelectAttribut.addEventListener("change", filterSalles)

formSelectFavorie.addEventListener("click", toggleFavoriteFilter);

function filterSalles() {
    const etageId = formSelectEtage.value;
    const typeSalle = formSelectType.value;
    const attributSalle = formSelectAttribut.value;
    const isFavorie = document.querySelector(".iconStar-filter");
    const salleFavorie = getCookie("mesSallesFavorites");

    salleClick.forEach(function (salle) {
        const matchesEtage = etageId === "all" || salle.dataset.etage == etageId;
        const matchesType = typeSalle === "all" || salle.dataset.type == typeSalle;

        let matchesAttribut = false;

        // Vérification de l'attribut sélectionné uniquement
        if (attributSalle === "all") {
            matchesAttribut = true;
        } else {
            // Vérification de l'attribut spécifique sélectionné
            matchesAttribut = salle.dataset[attributSalle] === attributSalle;
        }
        console.log(salle.dataset["priseelectrique"])
        let matchesFavorie = false;
        if (isFavorie.getAttribute("d") === dStarFull) {
            matchesFavorie = salleFavorie.includes(salle.dataset.salleclickid);
        } else {
            matchesFavorie = true;
        }

        if (matchesEtage && matchesType && matchesAttribut && matchesFavorie) {
            salle.style.display = "block";
        } else {
            salle.style.display = "none";
        }
    });
}


function toggleFavoriteFilter() {
    const isFavorie = document.querySelector(".iconStar-filter");

    if (isFavorie.getAttribute("d") === dStarEmpty) {
        isFavorie.setAttribute("d", dStarFull);
    } else {
        isFavorie.setAttribute("d", dStarEmpty);
    }
    filterSalles();
}

const dStarFull = "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z";
const dStarEmpty = "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z";


//input search salle 
document.getElementById('searchRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputValue = document.getElementById('salleInput').value;
    document.getElementById('salleInput').value = "";
    container_infoSalle.forEach(info => {

        const salleNum = info.dataset.sallenum;
        const salleNom = info.dataset.sallenom;


        if (inputValue == salleNum || inputValue == salleNom) {
            info.classList.remove("hidden");
            body.classList.add("bodyBackDesable");
        }
    })
});

//affiche plan si clique sur card mais pas sur les étoiles
salleClick.forEach(salle => {
    salle.addEventListener('click', function (e) {
        if (e.target.closest('.iconStar')) {
            return; 
        }

        const salleClickId = salle.dataset.salleclickid;

        containerPlanInfo.forEach(plan => {
            if (plan.dataset.sallelid === salleClickId) {
                plan.classList.remove("hidden");
                body.classList.add("bodyBackDesable");
            }
        });
    });
});


closeModal.forEach(c => c.addEventListener("click", function (e) {
    const parent = c.parentNode;
    parent.classList.toggle("hidden");
    body.classList.remove("bodyBackDesable");



}))







const AddIconFavorie = function (container, nameDataset) {
    let listSalleFavorite = getCookie("mesSallesFavorites");

    const dStarFull = "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z";
    const dStarEmpty = "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z";

    container.forEach(infosalle => {
        const salleID = infosalle.dataset[nameDataset];
        const iconSvg = infosalle.querySelector(".iconStar path");

        if (listSalleFavorite.includes(salleID)) {
            iconSvg.setAttribute("d", dStarFull);
        } else {
            iconSvg.setAttribute("d", dStarEmpty);
        }
    });
}


const updateIcon = function (){
    AddIconFavorie(box_iconFavori_visu, "salleinfoid");
    AddIconFavorie(box_iconFavori, "salleidfavorite");
}

updateIcon()


const iconsStar = document.querySelectorAll(".iconStar");

iconsStar.forEach(iconStar => {

    iconStar.addEventListener("click", function (e) {
        var parentIcon = iconStar.parentNode;

        if (parentIcon.classList.contains("box_iconFavori_visuSalle")) {
            setCookie("mesSallesFavorites", parentIcon.dataset.salleinfoid);
            updateIcon()
        } else {
            setCookie("mesSallesFavorites", parentIcon.dataset.salleidfavorite);
            updateIcon()
        }

    })
})

//// Gestion du zoom des plans
//document.addEventListener('DOMContentLoaded', function() {
//    const planSections = document.querySelectorAll('.section_imgPlan');

//    planSections.forEach(section => {
//        const container = section.querySelector('.img-plan-container');
//        const img = section.querySelector('.img-plan');
//        const zoomControls = section.querySelector('.zoom-controls');

//        let scale = 1.7;
//        let isDragging = false;
//        let startX, startY;
//        let translateX = 0;
//        let translateY = 0;
//        let lastTranslateX = 0;
//        let lastTranslateY = 0;
//        let animationFrameId = null;
//        let zoomLevel = 0;
//        const zoomLevels = [1.7, 2.5, 3.5, 4.5];

//        // Appliquer l'échelle initiale
//        updateTransform();

//        function updateTransform() {
//            if (animationFrameId) {
//                cancelAnimationFrame(animationFrameId);
//            }
//            animationFrameId = requestAnimationFrame(() => {
//                const bounded = getBoundedPosition(translateX, translateY);
//                container.style.transform = `translate(${bounded.x}px, ${bounded.y}px) scale(${scale})`;
//            });
//        }

//        function getBoundedPosition(x, y) {
//            const rect = section.getBoundingClientRect();
//            const containerRect = container.getBoundingClientRect();

//            const maxX = Math.max(0, (containerRect.width * scale - rect.width) / 2);
//            const maxY = Math.max(0, (containerRect.height * scale - rect.height) / 2);

//            let boundedX = x;
//            let boundedY = y;

//            if (Math.abs(x) > maxX) {
//                const overshoot = Math.abs(x) - maxX;
//                boundedX = x > 0 ? maxX + overshoot * 0.2 : -maxX - overshoot * 0.2;
//            }

//            if (Math.abs(y) > maxY) {
//                const overshoot = Math.abs(y) - maxY;
//                boundedY = y > 0 ? maxY + overshoot * 0.2 : -maxY - overshoot * 0.2;
//            }

//            return { x: boundedX, y: boundedY };
//        }

//        function zoomToLevel(level) {
//            const oldScale = scale;
//            zoomLevel = Math.max(0, Math.min(zoomLevels.length - 1, level));
//            scale = zoomLevels[zoomLevel];

//            // Calcul du centre de l'image
//            const rect = section.getBoundingClientRect();
//            const containerRect = container.getBoundingClientRect();

//            // Calcul des dimensions de l'image avec le nouveau zoom
//            const newWidth = containerRect.width * scale;
//            const newHeight = containerRect.height * scale;

//            // Calcul des limites pour garder l'image centrée
//            const maxX = Math.max(0, (newWidth - rect.width) / 2);
//            const maxY = Math.max(0, (newHeight - rect.height) / 2);

//            // Réinitialisation de la position au centre
//            translateX = 0;
//            translateY = 0;

//            // Application des limites
//            const bounded = getBoundedPosition(translateX, translateY);
//            translateX = bounded.x;
//            translateY = bounded.y;

//            lastTranslateX = translateX;
//            lastTranslateY = translateY;

//            updateTransform();
//        }

//        // Gestion des boutons de zoom
//        zoomControls.addEventListener('click', function(e) {
//            const button = e.target.closest('.zoom-btn');
//            if (!button) return;

//            const action = button.dataset.action;
//            switch(action) {
//                case 'zoom-in':
//                    zoomToLevel(zoomLevel + 1);
//                    break;
//                case 'zoom-out':
//                    zoomToLevel(zoomLevel - 1);
//                    break;
//                case 'reset':
//                    zoomLevel = 0;
//                    scale = zoomLevels[zoomLevel];
//                    translateX = 0;
//                    translateY = 0;
//                    lastTranslateX = 0;
//                    lastTranslateY = 0;
//                    updateTransform();
//                    break;
//            }
//        });

//        // Gestion du déplacement avec la souris
//        section.addEventListener('mousedown', function(e) {
//            if (e.target === img || e.target === container) {
//                e.preventDefault();
//                isDragging = true;
//                startX = e.clientX - translateX;
//                startY = e.clientY - translateY;
//                container.classList.add('dragging');
//            }
//        });

//        function handleMove(e) {
//            if (!isDragging) return;

//            translateX = e.clientX - startX;
//            translateY = e.clientY - startY;

//            updateTransform();
//        }

//        document.addEventListener('mousemove', handleMove);

//        document.addEventListener('mouseup', function() {
//            if (isDragging) {
//                isDragging = false;
//                container.classList.remove('dragging');

//                const bounded = getBoundedPosition(translateX, translateY);
//                translateX = bounded.x;
//                translateY = bounded.y;

//                lastTranslateX = translateX;
//                lastTranslateY = translateY;

//                updateTransform();
//            }
//        });

//        // Gestion du zoom avec la molette
//        section.addEventListener('wheel', function(e) {
//            e.preventDefault();
//            const delta = e.deltaY > 0 ? -1 : 1;
//            zoomToLevel(zoomLevel + delta);
//        });

//        // Nettoyage lors de la fermeture de la modal
//        const closeModal = section.closest('.container_plan_info').querySelector('.closeModal');
//        if (closeModal) {
//            closeModal.addEventListener('click', function() {
//                if (animationFrameId) {
//                    cancelAnimationFrame(animationFrameId);
//                }
//            });
//        }
//    });
//});


//apperçu du plan a sa creation
