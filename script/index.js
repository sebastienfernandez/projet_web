
/*   si échec de la prise en charge du localstorage ou de sa disponibilité  */

function storageAvailable(type) {
    
    try {
        /* déclaration d'une variable storage et d'une varibale 'test'   */
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // tous es navigateurs sauf Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // et si code non présent (sans Firefox)
            e.name === 'QuotaExceededError' ||
            // code non présent avec Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // vérification du stockage
            (storage && storage.length !== 0);
    }
}




let favoriteRandom = JSON.parse(localStorage.favs)[Math.floor(Math.random()*(JSON.parse(localStorage.favs).length))];

//localStorage.setItem('random', favoriteRandom);

console.log(JSON.parse(localStorage.favs).length);


if (JSON.parse(localStorage.favs).length !== 0) {
    $.ajax({
        url : 'https://api.deezer.com/track/' + favoriteRandom + '&output=jsonp',
        dataType : 'jsonp'
    }).done(function(random) {
        
        $('#favorites-results').append(
                 '<div class="results-box"><h3>' + random.title + '</h3>'  
                + '<img src=' + random.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                + '<span class="artist-name">' + random.artist.name +'</span>'
                + '<p>' + random.album.title + '</p>'
                + '<audio src=' + random.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio></div><br>'
                );

                $('#another-music').click(function() {
                    let favoriteRandom = JSON.parse(localStorage.favs)[Math.floor(Math.random()*(JSON.parse(localStorage.favs).length))];
                    $.ajax({
                        url : 'https://api.deezer.com/track/' + favoriteRandom + '&output=jsonp',
                        dataType : 'jsonp'
                    }).done(function(random) {
                        document.querySelector('.results-box').innerHTML = 
                        '<h3>' + random.title + '</h3>'  
                        + '<img src=' + random.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                        + '<span class="artist-name">' + random.artist.name +'</span>'
                        + '<p>' + random.album.title + '</p>'
                        + '<audio src=' + random.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio><br>'
                    })

                    
                });
               
    
    });
    document.querySelector('#favorites-results').innerHTML = 
    '<div class="text-for-random"><p class="p-results">Une musique de vos favoris au hasard : </p></div>';
    if (JSON.parse(localStorage.favs).length > 1) {
        $('.text-for-random').append('<button id="another-music">Choisir une autre musique</button>');
    }
} else {
    console.log("il n'y a pas de favori");
};






    




// possibilité d'utiliser la méthode JSONP (hack)

/*fetch('https://api.deezer.com/search?q=eminem')
    .then(response => response.jsoon())
    .then(musiques => {
        document.querySelector('#results').innerHTML =
            musiques.map(m => m.title).join('<br>');
    });*/

    