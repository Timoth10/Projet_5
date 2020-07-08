/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class PanierProducts { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ 
            const response = JSON.parse(result);
            this.products= response; 
            //Filtrage du local Storage
            const articlesPanier = [];
            const idsProducts= []; 
            if (localStorage.length > 0) {
                for(let product of this.products) { 
                    if (localStorage.getItem(product._id)){ 
                        articlesPanier.push(product); 
                        idsProducts.push(product._id); 
                    }
                }
                //console.log(idsProducts);//TEST le tableau d'id envoyé sera bien une liste de strings !
            }
            this.listeCommande = articlesPanier; 
            this.productPanierView = new ProductPanierView(this.listeCommande, (contact, products)=>{
                new Request().post("http://localhost:3000/api/cameras/order" , {
                    contact:contact,
                    products: idsProducts
                }).then((result)=>{
                    const response = JSON.parse(result); 
                    localStorage.setItem("orderId", JSON.stringify(response.orderId)); 
                    localStorage.setItem("firstName", JSON.stringify(response.contact.firstName));
                    localStorage.setItem("lastName", JSON.stringify(response.contact.lastName)); 
                    document.location.href="confirmation.html";
                }).catch(() =>{
                    console.log("erreur de chargement"); 
                });
            }); 
            appContainer.appendChild(this.productPanierView.render()); 
        }).catch(()=>{
            console.log("erreur de chargement");
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PANIER ########## */

/* - 2 : COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT DU PANIER ##### */

class ProductViewPanier { 
    constructor(product) { 
        this.product = product;
    }
    render() { 
        const price = new ConvertToPrice(this.product.price).render(); 
        const productContainer = document.createElement("div"); 
        productContainer.innerHTML = `<p>${this.product.name} (${price} €)</p>`;
       
        // bouton de suppression de l'article
        const boutonSuppPanier = document.createElement("button"); 
        boutonSuppPanier.setAttribute("class", "btn btn-sm btn-outline-primary w-25");
        boutonSuppPanier.textContent = "Retirer cet article"; 
        productContainer.appendChild(boutonSuppPanier); 
        const productId = this.product._id;
        boutonSuppPanier.addEventListener("click", function(event){ 
            localStorage.removeItem(productId); 
            window.history.go(); 
            event.stopPropagation(); 
            });

        return productContainer; 
    } 
}

/* - 1 : COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DE(S) PRODUIT(S) DU PANIER A INTEGRER AU AU DOM ##### */

class ProductPanierView {
    constructor(listeCommande, onSubmit=()=>{}) {
        this.listeCommande = listeCommande; 
        this.form = document.getElementById("form"); 
        this.form.addEventListener("submit" , function(event){
            const contact= {}; 
            contact.firstName = form.elements.firstName.value; 
            contact.lastName = form.elements.lastName.value;
            contact.address = form.elements.address.value;
            contact.city = form.elements.city.value;
            contact.email = form.elements.email.value;
            event.preventDefault();
            event.stopPropagation();
            onSubmit(contact);
            //console.log(contact); //TEST
        });
    }
    render() { 
        const productPanierContainer = document.createElement("div");
        productPanierContainer.setAttribute("class", "card mb-3 text-center panier");
        const prixTotalPanierContainer = document.createElement("div"); 
        prixTotalPanierContainer.setAttribute("class", "mb-3 text-center"); 
        const prixTotal = []; 
        for (let product of this.listeCommande){ 
                productPanierContainer.appendChild(new ProductViewPanier(product).render()); 
                prixTotal.push(product.price); 
                //console.log(articlesPanier);//TEST 
            };
        if (prixTotal.length >0){
            const reducer = (accumulator, currentValue)=> accumulator + currentValue;
            const totalCommande = prixTotal.reduce(reducer);
            //console.log(prixTotal);//TEST
            //console.log(totalCommande);//TEST
            const totalPrice = new ConvertToPrice(totalCommande).render(); 
            prixTotalPanierContainer.innerHTML = `Total de la commande = ${totalPrice} €`; 
            productPanierContainer.appendChild(prixTotalPanierContainer); 
        } else {
            productPanierContainer.textContent="Votre panier est vide"; 
            const blocForm = document.getElementById("blocForm");
            blocForm.style.display="none";
        };

        return productPanierContainer; 
    }

}


/* ########## CHARGEMENT DE LA LISTE COMPLÈTE DÈS LE CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const panierProducts = new PanierProducts(); 
} 

