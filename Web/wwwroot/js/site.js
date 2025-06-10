const formSelectEtage = document.querySelector("#etageSelect");
const salleClick = document.querySelectorAll(".salles_click");
const container_infoSalle = document.querySelectorAll('.container_infoSalle');



document.addEventListener('DOMContentLoaded', function () {

    salleClick.forEach(salle => {
        salle.addEventListener('click', function (e) {
            const salledataId = salle.dataset.salledataid;

            container_infoSalle.forEach(info => {
                if (info.dataset.sallelid === salledataId) {
                    info.style.display = "block";
                } else {
                    info.style.display = "none";
                }
            });
        });
    });
});



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


document.getElementById('searchRoomForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inputValue = document.getElementById('salleInput').value;
    console.log('Valeur de l\'input :', inputValue);
    container_infoSalle.forEach(info => {

        const salleNom = info.dataset.sallenom;
        console.log('Valeur de l\'input :', salleNom);

        if (inputValue == salleNom) {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    })
});