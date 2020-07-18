// URL de l'api
const url = "http://localhost:3000/api/cameras";

// Affiche tous les produits
const displayProducts = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
  });
};
// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Fourni l'affichage d'un produit
function renderProduct(productName, productId, productImg, productPrice) {
  const products = document.querySelector("#products"); // Récupère la div qui contiendra les différents articles
  const article = document.createElement("article");
  article.innerHTML = `<img alt="${productName}" src="${productImg}">
    <button class="product-link" type="button"><a href="product.html?id=${productId}">Voir le produit</a></button>
    <p class="product-title">${productName}</p>
    <p class="price">${productPrice / 100}</p>
    `;
  products.appendChild(article);
}

displayProducts();
