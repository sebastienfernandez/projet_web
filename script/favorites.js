


$(function() {
    
    

    const favs = JSON.parse(localStorage.getItem('favs'));
    console.log(favs.length);

    //texte indicatif s'il n'y a pas de favoris

    if (favs.length === 0) {
        document.querySelector('#favorites-selection').innerHTML =
                    '<p class="p-results">Aucun favoris dans votre liste...</p>'
    };


    
    favs.forEach(fav => {
        // recherche de l'ensemble des morceaux favoris 
        $.ajax({
            url : 'https://api.deezer.com/track/' + fav +'&output=jsonp',
            dataType : 'jsonp'
        }).done(function(track) {
            
            //intégration de cet ensemble sous la forme d'un tableau

            $('#favorites-selection').append(
                     '<div class="results-box"><h3>' + track.title + '</h3>'  
                    + '<img src=' + track.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + track.artist.name +'</span>'
                    + '<p class="line-album">dans son album : <span class="title-album">' + track.album.title + '</span></p>'
                    + '<audio src=' + track.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    + '<button data-id="'+track.id+'" class="alternate">Retirer des favoris</button></div>'
            );

            //l'element entier disparaît au clic

            $("#favorites-selection").on('click', '.alternate', function() {
                const favs = JSON.parse(localStorage.getItem('favs')) || [];
                const newFavs = favs.filter(f => f !== $(this).data("id"));
                localStorage.setItem('favs', JSON.stringify(newFavs));
                let elementToDisplay = $(this).parent();
                elementToDisplay.css('display', 'none');
                if (favs.length === 0) {
                    document.querySelector('#favorites-selection').innerHTML =
                                '<p class="p-results">Aucun favoris dans votre liste...</p>'
                };
                
            });
                   
        
        });

    });
    
    //demande confirmation puis si oui, supression de tous les favoris
    
    $("#clear-button").on('click',function() {
        if (confirm("Voulez vous vraiment supprimer tous vos favoris ?")) {
            localStorage.clear();
            document.querySelector('#favorites-selection').innerHTML =
                '<p class="p-results">Aucun favoris dans votre liste...</p>'
        } 
        
    });
    

});







