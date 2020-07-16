// Déclaration d'une constante contenant le lien de l'API
var API = "http://localhost:3000/api/cameras";

// Création d'une fonction de connexion à l'API
function connexionAPI(fonctionRetour, lien) {
    var url = lien ? lien : API;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                resolve(fonctionRetour(JSON.parse(this.responseText)));
            } else {
                reject(this.statusText);
            }
        };
        xhr.onerror = () => reject(this.statusText);
        xhr.send();
    });
}