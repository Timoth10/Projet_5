// URL de l'api
const url = "http://localhost:3000/api/cameras/";
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const article = document.querySelector("article");

// Affiche le produit
const displayProduct = async () => {
  const data = await getOneCams(url, id);
  renderCams(data);
  customizeYourCamera(article, data.lenses);
  addToCart(article, data);
};
// Récupère une caméra
const getOneCams = async (productUrl, productId) => {
  const response = await fetch(productUrl + productId);
  return await response.json();
};
// Fourni l'affichage selon les données du produit
const renderCams = (productData) => {
  article.innerHTML = `
    <div class="product">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-information">
            <h2 class="product-title">${productData.name}</h2>
            <p class="price">${productData.price / 100}</p>
            <p class="description">Toutes nos caméras sont de qualité, et vous garantissent une longévité extrême !</p>
        </div>
    </div>`;
};

// Personnalise le produit
const customizeYourCamera = (parentElt, productLenses) => {
  // Crée liste déroulante
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.setAttribute("for", "lenses-list");
  label.textContent = "Lentilles disponibles : ";
  select.id = "lenses-list";

  parentElt.appendChild(label).appendChild(select);
  // Crée une balise option pour chaque lentille
  productLenses.forEach((productLense) => {
    const option = document.createElement("option");
    option.value = productLense;
    option.textContent = productLense.toUpperCase();
    select.appendChild(option);
  });
  // Récupère la lentille choisie dans la console
  select.addEventListener("change", (e) => {
    lenseChosen = e.target.value.toLowerCase();
  });
};
// // Ajoute le produit au panier
const addToCart = (parentElt, productData) => {
  // Crée le bouton d'envoie du produit
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Ajouter au panier";
  div.classList.add("add-to-cart");
  parentElt.appendChild(div).appendChild(btn);

  // Assigne valeur à envoyer à localStorage
  const product = {
    id: productData._id,
    name: productData.name,
    price: productData.price,
    imageUrl: productData.imageUrl,
    quantity: 1,
  };

  // Envoie valeur à localStorage après un clique
  btn.addEventListener("click", () => {
    // récupérer panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    // ajouter le produit au panier
    if (panier[product.id] !== undefined) {
      panier[product.id].quantity += 1;
    } else {
      panier[product.id] = product;
    }
    // update panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    btn.classList.add("invisible");
    div.textContent = "Le produit a été ajouté au panier !";
  });
};

displayProduct();
