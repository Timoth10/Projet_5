
/* ########## COMPOSANT DE RECUPERATION DE L'IDENTIFIANT DU PRODUIT A PARTIR DES PARAMETRES DE L'URL ########## */

class Identifiant {
    constructor(paramUrl){
        this.paramUrl = paramUrl; 
    }
    determinId () {
        const id = this.paramUrl.split("="); 
        return id[1]; 
    }
}

/* ########## COMPOSANT DE FORMATAGE DES TARIFS ########## */

class ConvertToPrice {
    constructor (number) {
        this.number = number; 
    }
    render(){
        const num = this.number;
        const numberToString = num.toString(); 
        const price = numberToString.replace("00", ",00"); 
        return price;
    }
}


/* ##### TESTS ##### */

/* const testConversion = new ConvertToPrice (100);
console.log(testConversion.render()); // doit afficher 1,00 */

/* const testDeterminId = new Identifiant("id=le récupérateur d'id fonctionne correctement");
console.log(testDeterminId.determinId()); */