
const formSelectEtage = document.querySelector("#etageSelect");
const formSelectFavorie = document.querySelector("#favoriSelect");
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


function showSpecificFields() {
    var typeSalle = document.getElementById('typeSalle').value;

    // Cacher tous les champs spécifiques
    document.getElementById('reunionFields').style.display = 'none';
    document.getElementById('pauseFields').style.display = 'none';
    document.getElementById('bubbleFields').style.display = 'none';

    // Afficher les champs correspondants au type sélectionné
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



// Écouteur d'événement pour le filtre d'étage
formSelectEtage.addEventListener("change", filterSalles);

// Écouteur d'événement pour le filtre favori
formSelectFavorie.addEventListener("click", toggleFavoriteFilter);

function filterSalles() {
    const etageId = formSelectEtage.value;
    const isFavorie = document.querySelector(".iconStar-filter");
    const salleFavorie = getCookie("mesSallesFavorites");

    salleClick.forEach(function (salle) {
        const matchesEtage = etageId === "all" || salle.dataset.etage == etageId;
        let matchesFavorie = false;

        if (isFavorie.getAttribute("d") === dStarFull) {
            matchesFavorie = salleFavorie.includes(salle.dataset.salleclickid);
        } else {
            matchesFavorie = true;
        }

        if (matchesEtage && matchesFavorie) {
            salle.style.display = "block";
        } else {
            salle.style.display = "none";
        }
    });
}

function toggleFavoriteFilter() {
    const isFavorie = document.querySelector(".iconStar-filter");

    // Inverser l'état de l'icône d'étoile
    if (isFavorie.getAttribute("d") === dStarEmpty) {
        isFavorie.setAttribute("d", dStarFull);
    } else {
        isFavorie.setAttribute("d", dStarEmpty);
    }

    // Appliquer le filtre après avoir changé l'état de l'icône
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

