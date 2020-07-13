// Déclaration des variables
var notificationDiv = document.getElementById("notification")
var notificationTextDiv = document.getElementById("notificationTexte");
var formulaireDiv = document.getElementById("formulaire");
var fermerFormulaireModal = document.getElementById("fermer-form");
var fermerNotificationModal = document.getElementById("fermer-notif");

// Création des évènements
fermerNotificationModal.onclick = function() {
    $("#modal").fadeOut();
}

fermerFormulaireModal.onclick = function() {
    $("#modal").fadeOut();
}

window.onclick = function(e) {
    if (e.target == document.getElementById("modal")) {
        $("#modal").fadeOut();
    }
}

// Création de la fonction
function modal(type, message) {

    // Si le type de modal est une notification
    if (type == "notification") {

        // Si le formulaire est affiché, on l'enlève
        if (formulaireDiv.style.display == "block") {
            formulaireDiv.style.display == "none";
        }

        // Ensuite, on affiche la notification
        notificationDiv.style.display = "block";
        notificationTextDiv.textContent = message;
        $("#modal").fadeIn();
    }

    // Sinon si le type de modal est un formulaire
    else if (type == "formulaire") {

        // Si la notification est affiché, on l'enlève
        if (notificationDiv.style.display == "block") {
            notificationDiv.style.display == "none";
        }
        // Ensuite, on affiche la notification
        formulaireDiv.style.display = "block";
        $("#modal").fadeIn();
    }
}