// Déclaration des variables
var orderDiv = document.getElementById("orderId");
var priceDiv = document.getElementById("orderPrice");
const orderId = localStorage.getItem("orderId");
const orderPrice = localStorage.getItem("orderPrice");

// Si aucune commande n'a été passée, on redirige vers l'accueil
if (!orderId || !orderPrice) {
    document.location.href = "index.html"
}

// Sinon, on affiche les informations de la commande
else {
    orderDiv.textContent = orderId;
    priceDiv.innerHTML = orderPrice / 100 + "&euro;";
}