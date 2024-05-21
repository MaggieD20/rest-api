(function () {
    console.log("rest API")
    // URL de l'API REST de WordPress


    let bouton_categorie = document.querySelectorAll(".bouton__categorie");
    console.log(bouton_categorie.length);

    let categories = 3
    let numero = 0;
    for (const elm of bouton_categorie) {

        numero++;
        elm.dataset.num = numero;
        elm.addEventListener("mousedown", function (e) {
            console.log(e.target.dataset.num);
            categories = e.target.dataset.num;
            let url = `https://gftnth00.mywhc.ca/tim37/wp-json/wp/v2/posts?categories=${categories}`;
            restApi(url);
        });
    }



    function restApi(url) {
        // Effectuer la requête HTTP en utilisant fetch()
        fetch(url)
            .then(function (response) {
                // Vérifier si la réponse est OK (statut HTTP 200)
                if (!response.ok) {
                    throw new Error(
                        "La requête a échoué avec le statut " + response.status
                    );
                }

                // Analyser la réponse JSON
                return response.json();
                console.log(response.json());
            })
            .then(function (data) {
                // La variable "data" contient la réponse JSON
                console.log(data);
                let restapi = document.querySelector(".contenu__restapi");
                restapi.innerHTML = "";
                // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                data.forEach(function (article) {
                    let titre = article.title.rendered;
                    if (article.meta && article.meta.ville_avoisinante) {

                    }
                    let contenu = article.content.rendered;
                    contenu = contenu.substr(0, 75) + "...";
                    let lien = article.link;
                    // transformer le coontenue en tableau et faire un split
                    console.log(titre);
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__carte");

                    carte.innerHTML = `
        <h2>${titre}</h2>
        <p>${contenu}</p>
        <a href="${lien}">voir la suite</a>
        `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function (error) {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
})();
