/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class DetailProduct { 
    constructor(id) {
        new Request().get(`http://localhost:3000/api/cameras/${id}`).then((result)=>{
            const response = JSON.parse(result);
            this.product= response;  
            this.productDetailView = new ProductDetailView(this.product); 
            appContainer.appendChild(this.productDetailView.render()); 
            //console.log(this.product);//TEST (retourne un objet)
        }).catch(()=>{
            console.log("erreur de chargement"); 
            appContainer.textContent = "aucun produit sélectionné"; 
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA PAGE PRODUIT ########## */

/* - 2 : COMPOSANT DE GÉNÉRATION DE LA VUE DU PRODUIT ##### */

class ProductViewPP {
    constructor(product) { 
        this.product = product; 
    }

    render() { 
        const productContainer = document.createElement("div"); 
        const price = new ConvertToPrice(this.product.price).render(); 
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${price} €</p></div>`; 
        productContainer.setAttribute("class", "card mb-4 shadow-sm"); 

        // options lentilles
        const labelChoixLentille = document.createElement("label"); 
        labelChoixLentille.setAttribute("for","LensOpt"); 
        labelChoixLentille.textContent = "Choisissez une lentille en option :"; 
        const selectChoixLentille = document.createElement("select"); 
        selectChoixLentille.setAttribute("name","LensOpt"); 
        selectChoixLentille.setAttribute("class","form-control mb-3 w-25 product__option-lens"); 
        for (let lentille of this.product.lenses){ 
            var nouvelleLentille = document.createElement("option"); 
            var nouveauContenu = document.createTextNode(lentille); 
            nouvelleLentille.appendChild(nouveauContenu);
            selectChoixLentille.appendChild(nouvelleLentille); 
        };
        productContainer.appendChild(labelChoixLentille); 
        productContainer.appendChild(selectChoixLentille); 

        // bouton panier
        const boutonPanier = document.createElement("button");
        boutonPanier.setAttribute("type", "button"); 
        boutonPanier.setAttribute("id","boutonPanier"); 
        boutonPanier.setAttribute("class", "btn btn-lg btn-outline-primary w-75");
        boutonPanier.textContent = "Ajouter au panier"; 
        productContainer.appendChild(boutonPanier); 
        const idProdLStorage = this.product._id; 
        const prixProdLStorage = this.product.price; 
        boutonPanier.addEventListener("click", function(event){ 
            localStorage.setItem(idProdLStorage,prixProdLStorage); 
            boutonPanier.classList.replace("btn-outline-primary","btn-primary"); 
            boutonPanier.textContent = "Article ajouté au panier";
            event.stopPropagation(); 
            });

        return productContainer;
    } 
}

/* - 1 : COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM ##### */

class ProductDetailView { 
    constructor(product){ 
        this.product = product; 
    }
    render() { 
        const productDetailContainer = document.createElement("div"); 
        productDetailContainer.setAttribute("class", "card-deck mb-3 text-center"); 
        productDetailContainer.appendChild(new ProductViewPP(this.product).render()); 
        return productDetailContainer; 
    }
}


/* ########## CHARGEMENT DU PRODUIT DÈS LE CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const paramUrl = window.location.search; 
    const id = new Identifiant(paramUrl).determinId(); 
    const detailProduct = new DetailProduct(id); 
    //console.log(id);//TEST (doit afficher l'id du produit demandé)
} 



