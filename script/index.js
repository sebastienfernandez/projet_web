
/*  VERIFICATION DU LOCALSTORAGE    */
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

// si le licalStorage marche

if (storageAvailable('localStorage')) {

    //selection d'un id de localstorage au hasard

    let favoriteRandom = JSON.parse(localStorage.favs)[Math.floor(Math.random()*(JSON.parse(localStorage.favs).length))];
    
    //la valeur est mise en stockage local

    localStorage.setItem('random', favoriteRandom);
    
    //si il n'y a pas aucun favori
    
    if (JSON.parse(localStorage.favs).length !== 0) {
        $.ajax({
            //appel de la musique dont l'identifiant a été choisi au hasard
            url : 'https://api.deezer.com/track/' + favoriteRandom + '&output=jsonp',
            dataType : 'jsonp'
        }).done(function(random) {
            
            //ajout de la musique obtenue

            $('#favorites-results').append(
                     '<div class="results-box"><h3>' + random.title + '</h3>'  
                    + '<img src=' + random.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + random.artist.name +'</span>'
                    + '<p class="line-album">dans son album : <span class="title-album">' + random.album.title + '</span></p>'
                    + '<audio src=' + random.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio></div><br>'
                    );
    
                    //si le bouton est cliqué, une autre musique sera mis en place mais sera forcément différente car id différent


                    $('#another-music').click(function() {
                        while (favoriteRandom === JSON.parse(localStorage.random)) {
                            favoriteRandom = JSON.parse(localStorage.favs)[Math.floor(Math.random()*(JSON.parse(localStorage.favs).length))];
                        }
                        localStorage.setItem('random', favoriteRandom);
                        $.ajax({
                            url : 'https://api.deezer.com/track/' + favoriteRandom + '&output=jsonp',
                            dataType : 'jsonp'
                        }).done(function(random) {
                            document.querySelector('.results-box').innerHTML = 
                            '<h3>' + random.title + '</h3>'  
                            + '<img src=' + random.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                            + '<span class="artist-name">' + random.artist.name +'</span>'
                            + '<p class="line-album">dans son album : <span class="title-album">' + random.album.title + '</span></p>'
                            + '<audio src=' + random.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio><br>'
                        })
    
                        
                    });
                   
        
        });

        // texte indicatif

        document.querySelector('#favorites-results').innerHTML = 
        '<div class="text-for-random"><p class="p-results">Une musique de vos favoris au hasard : </p></div>';

        // si il y a plus d'une musique favorite, intgration du bouton qui propose une autre musique

        if (JSON.parse(localStorage.favs).length > 1) {
            $('.text-for-random').append('<button id="another-music"><i class="fas fa-sign-in-alt"></i>Choisir une autre musique</button>');
        }
    }
}

//si le localStorage ne marche pas

else {
	alert("L'application Deezerweb nécessite la disponiblité du localStorage API")
}


    