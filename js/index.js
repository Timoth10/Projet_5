/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */

const appContainer = document.getElementById('app');
//console.log(appContainer); // TEST (doit retourner un bloc <div>)


/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */

class ListProducts { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{
            const response = JSON.parse(result);
            this.products= response;  
            this.productListView = new ProductListView(this.products); 
            appContainer.appendChild(this.productListView.render()); 
            //console.log(this.products); // TEST (doit retourner un array)
        }).catch(()=>{
            console.log("erreur de chargement"); 
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA HOME PAGE ######### */

/* - 2 : COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT ##### */

class ProductViewHP { 
    constructor(product) { 
        this.product = product; 
    }
    render() { 
        const price = new ConvertToPrice(this.product.price).render(); 
        const productContainer = document.createElement("div"); 
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${price} €</p><a href="produit.html?id=${this.product._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit</a></div>`; 
        productContainer.setAttribute("class", "card mb-4 shadow-sm");
        return productContainer; 
    } 
}

/* - 1 : COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DES PRODUITS A INTEGRER AU DOM ##### */

class ProductListView { 
    constructor(products){ 
        this.products = products; 
    }
    render() { 
        const productListContainer = document.createElement("div"); 
        productListContainer.setAttribute("class", "card-deck mb-3 text-center");
        for (let product of this.products){
            productListContainer.appendChild(new ProductViewHP(product).render());
        };
        return productListContainer; 
    }
}


/* ########## CHARGEMENT DE LA LISTE DES PRODUITS AU CHARGEMENT COMPLET DE LA PAGE ########## */

window.onload = function() {  
    const listProducts = new ListProducts();
}


