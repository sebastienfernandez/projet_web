

$(function() {

    // champ titre focus d'entrée de jeu

    $("#title").focus();


    //l'appui de la touche enter déclenche la validation du formulaire

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $("#button-submit").click();
        }
    });

    function musicDisplay () {
        console.log('affichage des musiques');
    };

    

    //liste des titres de musique selon la musique lors du clic

    $("#button-submit").click(function() {

        let explicit = new Boolean();
        
        if ($('#explicit').is(':checked')) {
            explicit = true;
            console.log(explicit);
        } else {
            explicit = false;
            console.log(explicit);
        }

        $.ajax({
            url : 'https://api.deezer.com/search?q=' + $("#title").val() + '&output=jsonp&order=' + $("#sort-by").val() + '&explicit_lyrics=' + explicit,
            dataType : 'jsonp'
        }).done(function(musiques) {
        
            console.log(musiques);

            const favorites = JSON.parse(localStorage.getItem('favs')) || [];
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => '<div class="results-box"><h3>' + m.title + '</h3>'  
                    + '<img src=' + m.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + m.artist.name +'</span>'
                    + '<p>' + m.album.title + '</p>'
                    + '<audio src=' + m.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    + favoriteButton(favorites.find(f => m.id === f), m) + '</div>')
                    .join('<br>');
                   
            
            if (musiques.total === 0) {
                document.querySelector('#results').innerHTML =
                    '<p class="p-results">Aucun résultat pour cette recherche...</p>'
            }
        
        });

    });

    function favoriteButton (isFavorite, track) {
        return isFavorite ? '<button data-id="'+track.id+'" class="alternate">Retirer des favoris</button>' : '<button data-id="'+track.id+'" class="favorite-button">Ajouter aux favoris</button>'
    }

    //supression des champs du formulaire 

    $("#button-delete").click(function() {
        $(':input')
        .not(':button, :submit, :reset, :hidden, .form-button')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
    });


    //Ajout des favoris au localStorage

    $("#results").on('click', '.favorite-button', function() {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
        favs.push($(this).data('id'));
        localStorage.setItem('favs', JSON.stringify(favs));
        console.log(localStorage);
        console.log($(this).data("id"));
        $(this).removeClass('favorite-button');
        $(this).addClass('alternate');
        $(this).text('Retirer des favoris');
        console.log($(this).attr('class'));
        
    });

    //Retrait des favoris du localStorage

    $("#results").on('click', '.alternate', function() {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
        const newFavs = favs.filter(f => f !== $(this).data("id"));
        localStorage.setItem('favs', JSON.stringify(newFavs));
        console.log(localStorage);
        $(this).removeClass('alternate');
        $(this).addClass('favorite-button');
        $(this).text('Ajouter aux favoris');
        console.log($(this).attr('class'));
        
    });


    
});
