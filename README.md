projet 5 openclassrooms

Plan de test:

Index test effectué: récupérer les informations dans l'Api ("http://localhost:3000/api/cameras") qui nous a été fourni. Afficher tout les articles dans la page d'accueil (index.html).

résultat attendu: intégralité des articles sont affichés sont la page d'accueil (index.html).
Validé
Product test effectué: afficher l'article, avec les informations qui lui sont propres, en fonction de l'article sélectionné dans la page d'accueil (index.html). Ainsi de que les options possible pour chaque article. ajouter le produit dans le panier (cart.hmtl).

résultat attendu: l'article s'affiche correctement, avec les informations que l'on a récupéré par leurs "id".
                  les options s'affichent bien dans un menu déroulant et on récupere normalement avec un event.
                  l'envoi du produit dans le panier se fait bien avec toutes les informtions le concernant (identifiant, prix, quantité)
Validé
Cart test effectué: Récupérer le panier dans la page cart.html. stocker les articles sélectionnés avec leurs informations (identifiant, prix, quantité). vérifier que l'on peut modifier les quantités des articles, et donc les modifications du prix total. récupérer le formulaire qui se trouve dans la page cart.html, avec les regex pour valider les donnés entrées dans les champs à remploir. établir message d'erreur si le panier est vide. Vide le contenu du panier une fois la commande validé.

résultat attendu: le panier s'affiche correctement avec les articles sélectionnés avec leurs informations (identifiant, prix, quantité).
                  le prix total est bien synchronisé avec les articles selectionnés dans le panier.
                  le formulaire est bien affiché, avec les message d'erreur en cas de mauvais format des champs à remplir.
                  un message d'erreur s'affiche bien si le panier est vide.
                  une fois la commande validé on vide le panier.
Validé
Confirmation test effectué: Affichage de la page confirmation.html Vérifier que les informations de la commande soit bien récapitulée (identifiant, prix, quantité).

résultat attendu: la page s'affiche bien une fois la commande validé.
                  on retrouve bien les informations de la commande (identifiant, prix, quantité).

Validé
