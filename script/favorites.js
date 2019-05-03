


$(function() {
    
    const favs = JSON.parse(localStorage.getItem('favs'));
    
    console.log(favs);
    
    favs.forEach(fav => {
        $.ajax({
            url : 'https://api.deezer.com/track/' + fav +'&output=jsonp',
            dataType : 'jsonp'
        }).done(function(track) {
            console.log(track);
            
            $('#favorites-selection').append(
                     '<div class="results-box"><h3>' + track.title + '</h3>'  
                    + '<img src=' + track.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + track.artist.name +'</span>'
                    + '<p>' + track.album.title + '</p>'
                    + '<audio src=' + track.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    + '<button data-id="'+track.id+'" class="alternate">Retirer des favoris</button></div>'
            );

            $("#favorites-selection").on('click', '.alternate', function() {
                const favs = JSON.parse(localStorage.getItem('favs')) || [];
                const newFavs = favs.filter(f => f !== $(this).data("id"));
                localStorage.setItem('favs', JSON.stringify(newFavs));
                console.log(localStorage);
                $(this).removeClass('alternate');
                $(this).addClass('favorite-button');
                $(this).text('Ajouter aux favoris');
                let elementToDisplay = $(this).parent();
                elementToDisplay.css('display', 'none');
                if (favs.length === 0) {
                    document.querySelector('#favorites-selection').innerHTML =
                                '<p class="p-results">Aucun favoris dans votre liste...</p>'
                };
                
            });
                   
        
        });

    });
    
    
    $("#clear-button").on('click',function() {
        if (confirm("Voulez vous vraiment supprimer tous vos favoris ?")) {
            localStorage.clear();
            console.log(localStorage);
            document.querySelector('#favorites-selection').innerHTML =
                '<p class="p-results">Aucun favoris dans votre liste...</p>'
        } else {
            console.log(localStorage);
        }
        
    });
    
    
    
    if (favs.length === 0) {
            document.querySelector('#favorites-selection').innerHTML =
                        '<p class="p-results">Aucun favoris dans votre liste...</p>'
        };
    

});







