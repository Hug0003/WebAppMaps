
const btns = document.querySelectorAll(".btnFavori");
const salleClick_ = document.querySelectorAll(".salles_click");
const txtFavorie = document.querySelectorAll(".displayFavorie");

btns.forEach(btn => {
    let isFavorite = false;
    btn.addEventListener("click", function (e) {
        if (getCookie("mesSallesFavorites").includes(btn.dataset.salleidfavorite)) {
            isFavorite = false
            return
        }else {
            setCookie("mesSallesFavorites", btn.dataset.salleidfavorite)
            isFavorite = true
            txtFavorie.forEach(txt => {
                txt.textContent = isFavorite ? "Favori" : "Non favori";
            });
        }
    })
})

salleClick_.forEach(s => s.addEventListener("click", function (e) {
    let favorites = getCookie("mesSallesFavorites");
    let isFavorite = false;

    if (getCookie("mesSallesFavorites") && getCookie("mesSallesFavorites").includes(s.dataset.salleclickid)){
        isFavorite = true
    } else {
        isFavorite = false
    }
    txtFavorie.forEach(txt => {
        txt.textContent = isFavorite ? "Favori" : "Non favori";
    });
}));

function setCookie(nomCookie, nouvelElement) {
    let listeStringRecuperee = getCookie(nomCookie);

    let listeRecuperee = listeStringRecuperee ? JSON.parse(listeStringRecuperee) : [];

    listeRecuperee.push(nouvelElement);

    let listeMiseAJourJson = JSON.stringify(listeRecuperee);

    let dateDansUnAn = new Date();
    dateDansUnAn.setFullYear(dateDansUnAn.getFullYear() + 1);

    document.cookie = `${nomCookie}=${listeMiseAJourJson}; expires=${dateDansUnAn.toUTCString()}; path=/`;
}


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

