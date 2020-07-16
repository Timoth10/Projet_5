// Récupération de l'URL
const url = window.location.href.split("?id=")[1];

// Si aucun produit n'est défini, on retourne a l'accueil
if (!url) {
    document.location.href = "index.html";
}

// Connexion à l'API
connexionAPI(afficherProduit, "http://localhost:3000/api/cameras/" + url);

// Déclaration des variables

// Produits
let photoProduit = document.getElementById("photo");
let prixProduit = document.getElementById("prix");
let nomProduit = document.querySelector("h2");
let lentillesProduit = document.getElementById("lentilles");
let descProduit = document.getElementById("desc");
let champProduit = document.querySelector(".produit-page");

// Boutons & inputs
let ajouterAuPanier = document.getElementById("panier");

// Affichage des données
function afficherProduit(data) {

    // Récupération du produit
    const produit = data;

    // Si il n'y a pas de produit correspondant à l'ID récupéré
    if (produit.name === 'CastError' || produit.name === undefined) {

        // Création d'un message d'erreur
        champProduit.style.display = "block";
        let messageErreur = '<h2 class="centre">Oups, il semblerait que ce produit n\'existe pas..</h2><br>';
        messageErreur += '<p class="centre">Tu peux revenir à l\'accueil en cliquant <a href="./index.html"><span>ICI</span></a></p>';

        // Insertion du message d'erreur
        champProduit.innerHTML = messageErreur;
    }

    // Sinon
    else {

        // Déclaration de la variable lentilles
        const lentilles = produit.lenses.join(", ");

        // Insertion des informations du produit dans la page
        nomProduit.textContent = produit.name;
        lentillesProduit.textContent = lentilles;
        descProduit.textContent = produit.description;
        prixProduit.innerHTML = produit.price / 100 + "&euro;";
        photoProduit.setAttribute("src", produit.imageUrl);
    }
}

// Création d'une fonction pour l'ajout au panier
function ajouterPanier() {

    // Récupération des informations du panier
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    // La variable contenant les informations
    var informationsObjet = {
        "_id": url
    };

    // Si le panier est vide on stocke simplement les informations du produit dedans
    if (!panier) {
        localStorage.setItem("panier", [JSON.stringify(informationsObjet)]);
    }

    // Sinon on ajoute les informations du produit à celles déjà stockées
    else {
        panier.push(informationsObjet);
        localStorage.setItem("panier", [JSON.stringify(panier)]);
    }
    modal("notification", "Article ajouté au panier");
}

// Ajout des évènements
ajouterAuPanier.addEventListener("click", ajouterPanier);