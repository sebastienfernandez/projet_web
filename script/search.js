

$(function() {

    // champ titre focus d'entrée de jeu

    $("#title").focus();


    //l'appui de la touche enter déclenche la validation du formulaire

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $("#button-submit").click();
        }
    });

    // évenement lors du clic sur la touche "Go" du formulaire
    $("#button-submit").click(function() {

        //appel de la recherche via l'API Deezer

        $.ajax({
            url : 'https://api.deezer.com/search?q=' + $("#title").val() + '&output=jsonp&order=' + $("#sort-by").val(),
            dataType : 'jsonp'

        }).done(function(musiques) {

            //musiques = reponse de la recherche

            //la constante favorites est soit un tableau vide ou la clé 'favs' du localStorage

            const favorites = JSON.parse(localStorage.getItem('favs')) || [];

            //intégration de la réponse sous la forme de 'box' de musiques
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => '<div class="results-box"><h3>' + m.title + '</h3>'  
                    + '<img src=' + m.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + m.artist.name +'</span>'
                    + '<p class="line-album">dans son album : <span class="title-album">' + m.album.title + '</span></p>'
                    + '<audio src=' + m.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    // ajout du bouton par rapport à un id spécifique 'trouvé' dans le tableau
                    + favoriteButton(favorites.find(f => m.id === f), m) + '</div>')
                    .join('<br>');
                   
            // si la recherche n'obtient aucune musique, l'utilisateur est informé qu'il n'y a aucun résultat
            
            if (musiques.total === 0) {
                document.querySelector('#results').innerHTML =
                    '<p class="p-results">Aucun résultat pour cette recherche...</p>'
            }
        
        });

    });

    //function pour afficher la musique en statut 'favori' ou 'non-favori'

    function favoriteButton (isFavorite, track) {
        return isFavorite ? '<button data-id="'+track.id+'" class="alternate">Retirer des favoris</button>' : '<button data-id="'+track.id+'" class="favorite-button">Ajouter aux favoris</button>'
    }

    //bouton supplémentaire pour effacer les valeurs et statuts des champs du formulaire

    $("#button-delete").click(function() {
        $(':input')
        .not(':button, :submit, :reset, :hidden, .form-button')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
    });


    //Ajout des favoris au localStorage grâce à l'identifiant

    $("#results").on('click', '.favorite-button', function() {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
        favs.push($(this).data('id'));

        // ajout au localStorage

        localStorage.setItem('favs', JSON.stringify(favs));

        // modification des boutons

        $(this).removeClass('favorite-button');
        $(this).addClass('alternate');
        $(this).text('Retirer des favoris');
        
    });

    //Retrait des favoris du localStorage

    $("#results").on('click', '.alternate', function() {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];

        //parcours de favs en filtrant l'id de la musique 'favorie'

        const newFavs = favs.filter(f => f !== $(this).data("id"));
        localStorage.setItem('favs', JSON.stringify(newFavs));
        $(this).removeClass('alternate');
        $(this).addClass('favorite-button');
        $(this).text('Ajouter aux favoris');
        
    });


    
});
