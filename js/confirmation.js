/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class Confirmation { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ 
            const response = JSON.parse(result);
            this.products= response;  
            const articlesPanier = [];
            if (localStorage.length > 0) { 
                for(let product of this.products) { 
                    if (localStorage.getItem(product._id)){ 
                        articlesPanier.push(product); 
                        }
                    }
                };
            this.listeCommande = articlesPanier; 
            this.confirmationView = new ConfirmationView(this.listeCommande); 
            appContainer.appendChild(this.confirmationView.render()); 
        }).catch(()=>{
            console.log("erreur de chargement");
            appContainer.textContent="Malheureusement votre panier est vide...";
        })
    }
}


/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE CONFIRMATION ########## */

/* - 1 : COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM ##### */

class ConfirmationView { 
    constructor(listeCommande){ 
        this.listeCommande = listeCommande; 
        this.orderId = JSON.parse(localStorage.getItem("orderId")); 
        this.firstName = JSON.parse(localStorage.getItem("firstName"));
        this.lastName = JSON.parse(localStorage.getItem("lastName")); 

        localStorage.clear();
    }
    render() { 
        const confirmationContainer = document.createElement("div"); 
        confirmationContainer.setAttribute("class", "card-deck mb-3 text-center"); 

        // récupération du prix total
        const prixTotal = []; 
        for (let product of this.listeCommande){ 
                    prixTotal.push(product.price); 
            };
        const reducer = (accumulator, currentValue)=> accumulator + currentValue; 
        const totalCommande = prixTotal.reduce(reducer);
        const totalPrice = new ConvertToPrice(totalCommande).render(); 


        //message de confirmation de commande
        const contactContainer = document.createElement("div"); 
        contactContainer.innerHTML = `<div class="card-body"><p class="text-center">Nous vous remercions ${this.firstName} ${this.lastName} pour votre commande.</p><p>Identifiant à conserver:<br /> ${this.orderId} </p><p>Montant total = ${totalPrice} €</p></div>`; 
        contactContainer.setAttribute("class", "card mb-4 shadow-sm");
        confirmationContainer.appendChild(contactContainer); 
        
        return confirmationContainer; 
    }
}


/* ########## CHARGEMENT DE LA LISTE DES PRODUITS AU CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const confirmation = new Confirmation(); 
} 