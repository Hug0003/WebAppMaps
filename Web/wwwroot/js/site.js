const formSelectEtage = document.querySelector("#etageSelect");
const salleClick = document.querySelectorAll(".salles_click");
const container_infoSalle = document.querySelectorAll('.container_infoSalle');
const infoSalles = document.querySelectorAll(".box_visuSalleInfo")
const scrollContainer = document.querySelector(".container_ListSalle");

const btns = document.querySelectorAll(".btnFavori");
const txtFavorie = document.querySelectorAll(".displayFavorie");
const box_iconFavori = document.querySelectorAll(".box_iconFavori");



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




//input search salle 
document.getElementById('searchRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputValue = document.getElementById('salleInput').value;
    console.log('Valeur de l\'input :', inputValue);
    container_infoSalle.forEach(info => {

        const salleNum = info.dataset.sallenum;
        const salleNom = info.dataset.sallenom;
        console.log('Valeur de l\'input :', salleNum);

        if (inputValue == salleNum || inputValue == salleNom) {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    })
});

//select filtre salle selon étage
formSelectEtage.addEventListener("change", function () {
    const etageId = formSelectEtage.value;

    salleClick.forEach(function (salle) {

        if (salle.dataset.etage == etageId) {
            salle.style.display = "block";

        } else {
            salle.style.display = "none";
        }
        if (etageId == "all") {
            salle.style.display = "block";
        }
    });
});



//affiche les infos de la salle cliqué
salleClick.forEach(salle => {
    salle.addEventListener('click', function (e) {
        const salleClickId = salle.dataset.salleclickid;

        container_infoSalle.forEach(info => {
            if (info.dataset.sallelid === salleClickId) {
                info.style.display = "block";
            } else {
                info.style.display = "none";
            }
        });


    });
});


//scroll horizontal
const scrollY = function (parent) {
    parent.addEventListener('wheel', event => {
        event.preventDefault();
        parent.scrollLeft += event.deltaY;
    })

}

scrollY(scrollContainer)




//mettre icon favori
const AddIconFavorie = function (container, nameDataset) {
    let listSalleFavorite = getCookie("mesSallesFavorites");

    container.forEach(infosalle => {
        if (listSalleFavorite.includes(infosalle.dataset[nameDataset])) {
            let htmlIcon =
                `<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-star-fill iconFavoriFill iconStar" viewBox = "0 0 16 16" >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg >`;
            infosalle.insertAdjacentHTML("beforeend", htmlIcon)
        } else {
            let htmlIcon =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star iconFavoriNoFill iconStar" viewBox="0 0 16 16">
                 <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg>`
            infosalle.insertAdjacentHTML("beforeend", htmlIcon)
        }
    })
}

AddIconFavorie(infoSalles, "salleinfoid");
AddIconFavorie(box_iconFavori, "salleidfavorite")
const iconsStar = document.querySelectorAll(".iconStar");

    
iconsStar.forEach(iconStar => {
    console.log("ils sont la")
    iconStar.addEventListener("click", function (e) {
        e.preventDefault();
        var parentIcon = iconStar.parentNode;
        setCookie("mesSallesFavorites", parentIcon.dataset.salleidfavorite);

        if (iconStar.classList.contains("iconFavoriFill")) {
            AddIconFavorie(box_iconFavori, "salleidfavorite")

        } else {
            AddIconFavorie(box_iconFavori, "salleidfavorite")

        }
    })
}) 