// Connexion à l'API
connexionAPI(afficherListe);

// Fonction permettant d'afficher les informations
function afficherListe(data) {

    // Déclaration de la variable
    let listeDiv = document.getElementById("produits");

    // Création d'une boucle permettant d'afficher dynamiquement les différents éléments
    for (let i = 0; i < data.length; i++) {

        // Création du HTML
        let produit = '<div class="produit-field">';
        produit += '<a href="./produit.html?id=' + data[i]._id + '">';
        produit += '<div class="produit">';
        produit += '<div class="produit-photo" style="background-image: url(' + data[i].imageUrl + '"></div>';
        produit += '<ul class="produit-informations">';
        produit += '<li class="nom">' + data[i].name + '</li>';
        produit += '<li class="desc">' + pointsSuspension(data[i].description, 50) + '</li>';
        produit += '<li class="prix">' + data[i].price / 100 + '&euro;</li>';
        produit += '</ul></div></a></div>';

        // Insertion du HTML dans la page
        listeDiv.innerHTML += produit;
    }
}