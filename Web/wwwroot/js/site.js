const formSelectEtage = document.querySelector(".formSelectEtage");
const formSelectSalle = document.querySelector(".formSelectSalle");

formSelectEtage.addEventListener("change", function () {
    const etageId = formSelectEtage.value;

    formSelectSalle.disabled = true;

});
