// Fonction qui permet d'ajouter des points de suspensions sur un texte trop long
function pointsSuspension(texte, longueur) {
    if (texte == null) {
        return "";
    }
    if (texte.longueur <= longueur) {
        return texte;
    }
    texte = texte.substring(0, longueur);
    last = texte.lastIndexOf(" ");
    texte = texte.substring(0, last);
    return texte + "...";
}