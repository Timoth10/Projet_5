// Déclaration des variables
var erreurDiv = document.getElementById("erreur");
var inputPrenom = document.getElementById("prenom");
var inputNom = document.getElementById("nom");
var inputEmail = document.getElementById("email");
var inputAdresse = document.getElementById("adresse");
var inputVille = document.getElementById("ville");
var btnConfirmer = document.getElementById("confirmer");

// Création d'une fonction gérant les messages d'erreur
function erreur(input, message) {

    if (input == "prenom") {
        champ = document.getElementById("prenomErreur");
        input = inputPrenom
    }
    if (input == "nom") {
        champ = document.getElementById("nomErreur");
        input = inputNom
    }
    if (input == "email") {
        champ = document.getElementById("emailErreur");
        input = inputEmail
    }
    if (input == "adresse") {
        champ = document.getElementById("adresseErreur");
        input = inputAdresse
    }
    if (input == "ville") {
        champ = document.getElementById("villeErreur");
        input = inputVille
    }

    // Si il n'y a pas de message on retire le message d'erreur affiché
    if (message == "no") {
        input.classList.remove("erreur")
        champ.innerHTML = "";
    }

    // Sinon, on affiche un message d'erreur
    else {
        input.classList.add("erreur");
        champ.innerHTML = message;
    }
}

var productsB = JSON.parse(localStorage.getItem("panier"));

var idProducts = [];

if (productsB) {
    for (let i = 0; i < productsB.length; i++) {
        idProducts.push(productsB[i]._id)
    }
}

// Création d'une fonction confirmation de la commande
function confirmerCommande() {

    // Déclaration des variables
    const regexNomPrenom = /^[a-zA-Z ]+$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const prenom = inputPrenom.value;
    const nom = inputNom.value;
    const email = inputEmail.value;
    const adresse = inputAdresse.value;
    const ville = inputVille.value;

    let prenomOk;
    let nomOk;
    let emailOk;
    let adresseOk;
    let villeOk;

    // Si les champs sont remplis
    if (prenom != "") {
        prenomOk = true;
        erreur("prenom", "no")
    } else {
        prenomOk = false;
        erreur("prenom", "Le champ est vide")
    }
    if (nom != "") {
        nomOk = true;
        erreur("nom", "no")
    } else {
        nomOk = false;
        erreur("nom", "Le champ est vide")
    }
    if (email != "") {
        emailOk = true;
        erreur("email", "no")
    } else {
        emailOk = false;
        erreur("email", "Le champ est vide")
    }
    if (adresse != "") {
        adresseOk = true;
        erreur("adresse", "no")
    } else {
        adresseOk = false;
        erreur("adresse", "Le champ est vide")
    }
    if (ville != "") {
        villeOk = true;
        erreur("ville", "no")
    } else {
        villeOk = false;
        erreur("ville", "Le champ est vide")
    }

    // Si les inputs comportent un certain nombre de caractères
    if (prenom.length >= 2 && prenom.length <= 50) {
        prenomOk = true;
        erreur("prenom", "no")
    } else {
        prenomOk = false;
        erreur("prenom", "Votre prénom doit comporter entre 2 et 50 caractères.")
    }
    if (nom.length >= 2 && nom.length <= 70) {
        nomOk = true;
        erreur("nom", "no")
    } else {
        nomOK = false;
        erreur("nom", "Votre nom doit comporter entre 2 et 50 caractères.")
    }
    if (email.length >= 5 && email.length <= 70) {
        emailOk = true;
        erreur("email", "no")
    } else {
        emailOk = false;
        erreur("email", "Votre email doit comporter entre 5 et 70 caractères.")
    }

    // Si les inputs comportent des caractères valides
    if (regexNomPrenom.test(prenom) == true) {
        prenomOk = true;
        erreur("prenom", "no")
    } else {
        prenomOk = false;
        erreur("prenom", "Votre prénom contient des caractères invalides")
    }
    if (regexNomPrenom.test(nom) == true) {
        nomOk = true;
        erreur("nom", "no")
    } else {
        nomOk = false;
        erreur("nom", "Votre nom contient des caractères invalides")
    }
    if (regexEmail.test(email) == true) {
        emailOk = true;
        erreur("email", "no")
    } else {
        emailOk = false;
        erreur("email", "Merci d'entrer une adresse e-mail valide")
    }

    // Si tout est ok
    if (prenomOk == true && nomOk == true && emailOk == true && adresseOk == true && villeOk == true) {

        // On envoie nos données à l'API
        fetch('http://localhost:3000/api/cameras/order', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({

                    // Données du formulaire
                    contact: {
                        firstName: inputPrenom.value,
                        lastName: inputNom.value,
                        address: inputAdresse.value,
                        city: inputVille.value,
                        email: inputEmail.value
                    },

                    // Données des produits
                    products: idProducts
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                // Suppression des anciennes informations de commandes et du panier actuel
                localStorage.removeItem("orderId");
                localStorage.removeItem("orderPrice");
                localStorage.removeItem("panier");

                // Déclaration d'un prix de la commande et ajout du prix de commande
                let orderPrice = 0;

                // Calcul du prix total
                for (let i = 0; i < data.products.length; i++) {
                    orderPrice += data.products[i].price;
                }

                // Stockage des informations de la commande
                localStorage.setItem("orderPrice", orderPrice);
                localStorage.setItem("orderId", data.orderId);

                // Redirection sur la page de confirmation de commande
                document.location.href = "commande.html";

            })
            .catch(function(error) {
                console.log('Erreur: ', error);
            });

    }
}
// Ajout des évènements
btnConfirmer.addEventListener("click", confirmerCommande);