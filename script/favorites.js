


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
                    + '<button data-id="'+track.id+'" class="favorite-button">Ajouter aux favoris</button></div>'
                    );
                   
        
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
    
    
    
});

if (localStorage.length === 0) {
        document.querySelector('#favorites-selection').innerHTML =
                    '<p class="p-results">Aucun favoris dans votre liste...</p>'
    };
