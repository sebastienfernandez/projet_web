// test du localStrorage

monStockage = localStorage;

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

// test ajout de plusieurs valeurs au localstorage

localStorage.setItem("fr", 'bonjour');
localStorage.setItem("en", 'hello');
localStorage.setItem("all", 'guten tag');
localStorage.setItem("it", 'bonjiourno');
localStorage.setItem("jap", 'con-nichon-hann');
console.log(localStorage[1]);




if (localStorage.length != 0) {
    document.querySelector('#favorites-results').innerHTML = 
    '<p class="p-results">Une musique de vos favoris au hasard : </p>'
    + '<div class="results-box"><p>' + localStorage[Math.floor(Math.random()*localStorage.length)] + '</p></div>';
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

    