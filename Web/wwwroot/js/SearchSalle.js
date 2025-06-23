const formSelectEtage = document.querySelector("#etageSelect");
const formSelectFavorie = document.querySelector("#favoriSelect");
const formSelectType = document.querySelector("#typeSalle");
const formSelectAttribut = document.querySelector("#attributSalle");
const sortSelect = document.querySelector("#sortSelect");
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

    // Nettoyer la liste de toute valeur nulle ou indésirable
    listeRecuperee = listeRecuperee.filter(e => e !== null && e !== undefined && e !== "null" && e !== "undefined");

    if (!listeRecuperee.includes(nouvelElement)) {
        listeRecuperee.push(nouvelElement);
    } else {
        const index = listeRecuperee.indexOf(nouvelElement);
        listeRecuperee.splice(index, 1);
    }

    if (listeRecuperee.length === 0) {
        // Supprimer le cookie si la liste est vide
        document.cookie = `${nomCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } else {
        let listeMiseAJourJson = JSON.stringify(listeRecuperee);
        // Date d'expiration fixée à l'an 3000
        let dateAn3000 = new Date('3000-01-01T00:00:00Z');
        document.cookie = `${nomCookie}=${listeMiseAJourJson}; expires=${dateAn3000.toUTCString()}; path=/`;
    }
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
formSelectAttribut.addEventListener("change", filterSalles);
sortSelect.addEventListener("change", sortSalles);

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

function sortSalles() {
    const sortValue = sortSelect.value;
    const container = document.querySelector('.container_ListSalle');
    const salles = Array.from(container.querySelectorAll('.salles_click'));
    
    // Filtrer seulement les salles visibles
    const visibleSalles = salles.filter(salle => salle.style.display !== 'none');
    
    if (sortValue === 'default') {
        // Remettre dans l'ordre original
        visibleSalles.forEach(salle => {
            container.appendChild(salle);
        });
        return;
    }
    
    // Trier les salles selon le critère sélectionné
    visibleSalles.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.querySelector('p').textContent.localeCompare(b.querySelector('p').textContent);
            case 'name-desc':
                return b.querySelector('p').textContent.localeCompare(a.querySelector('p').textContent);
            case 'number-asc':
                return parseInt(a.querySelectorAll('p')[1].textContent) - parseInt(b.querySelectorAll('p')[1].textContent);
            case 'number-desc':
                return parseInt(b.querySelectorAll('p')[1].textContent) - parseInt(a.querySelectorAll('p')[1].textContent);
            case 'type-asc':
                return a.dataset.type.localeCompare(b.dataset.type);
            case 'type-desc':
                return b.dataset.type.localeCompare(a.dataset.type);
            case 'floor-asc':
                return parseInt(a.dataset.etage) - parseInt(b.dataset.etage);
            case 'floor-desc':
                return parseInt(b.dataset.etage) - parseInt(a.dataset.etage);
            default:
                return 0;
        }
    });
    
    // Réorganiser les salles dans le DOM
    visibleSalles.forEach(salle => {
        container.appendChild(salle);
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
document.getElementById('searchSalleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputValue = document.getElementById('salleInput').value;
    document.getElementById('salleInput').value = "";
    container_infoSalle.forEach(info => {

        const salleNum = info.dataset.sallenum;
        const salleNom = info.dataset.sallenom;


        if (inputValue == salleNum || inputValue == salleNom) {
            info.style.display="block";
            body.classList.add("bodyBackDesable");
        }
    })
});

// Le code de gestion des modals a été déplacé dans searchSalleModals.js
// Suppression du gestionnaire d'événements dupliqué pour éviter les conflits

// Le code de fermeture des modals a été déplacé dans searchSalleModals.js







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

// Le code de gestion des modals a été déplacé dans searchSalleModals.js







