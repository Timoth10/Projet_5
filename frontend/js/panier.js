// Connexion à l'API
connexionAPI(affichagePanier);

// Récupération du panier
var panier = JSON.parse(localStorage.getItem("panier"));

// Déclaration d'une variable
var produitsPanier = [];
var panierDiv = document.getElementById("panier");
var prixTotalDiv = document.getElementById("total");
var prixTotal = 0;
var validerBtn = document.getElementById("valider");

// Affichage du panier
function affichagePanier(data) {

    // Si on a un article dans le panier
    if (panier != null && panier.length > 0) {

        // Boucle pour chaque article du panier
        for (let i = 0; i < panier.length; i++) {

            const produitDesDonnees = data.find(element => element._id === panier[i]._id);

            if (produitDesDonnees) {

                // Création du HTML
                let listePanier = '<div class="produit-panier">';
                listePanier += '<a href="./produit.html?id=' + produitDesDonnees._id + '"><img src="' + produitDesDonnees.imageUrl + '" class="produit-image"></a>';
                listePanier += '<div class="produit-informations">';
                listePanier += '<h3><a href="./produit.html?id=' + produitDesDonnees._id + '">' + produitDesDonnees.name + '</a></h3>';
                listePanier += '<p>' + produitDesDonnees.price / 100 + '&euro;</p>';
                listePanier += '<div class="btn" onclick="supprimerProduit(\'' + produitDesDonnees._id + '\')">Retirer l\'article</div>';
                listePanier += '</div></div>';
                // Insertion du HTML
                panierDiv.innerHTML += listePanier

                // Augmentation du prix total
                prixTotal += produitDesDonnees.price;
            }

        }

        // Affichage du panier
        prixTotalDiv.innerHTML = "Total: " + prixTotal / 100 + "&euro;";

    }

    // Sinon, si le panier est vide, on affiche un message et on retire le bouton
    else {

        let messageVide = '<p class="centre">Vous avez surement oublié quelque chose...</p>';
        panierDiv.innerHTML += messageVide;
        validerBtn.style.display = "none";

    }
}

// Création de la fonction permettant de supprimer un produit du panier
function supprimerProduit(id) {

    // Boucle vérifiant quel produit veut-on supprimer
    for (let i = 0; i < panier.length; i++) {

        // Si l'id du produit correspond à l'article du panier on stocke son index
        if (panier[i].id == id) {
            var indexSuppression = i;
        }
    }

    // On récupère le panier et on lui retire l'article sélectionné à l'aide de l'index récuperé plus tôt
    panier.splice(indexSuppression, 1);

    // Puis on réinsère les informations dans le panier
    localStorage.setItem("panier", [JSON.stringify(panier)]);
    location.reload();

    // Et on notifie l'utilisateur
    modal("Notification", "Cet article a été supprimé de votre panier");
}

// Ajout des évènements
validerBtn.addEventListener("click", function() {
    modal("formulaire");
})