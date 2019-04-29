monStockage = localStorage;

localStorage.setItem('film','avengers 4');

console.log(monStockage);

/*   si échec de la prise en charge du localstorage ou de sa disponibilité  */

function storageAvailable(type) {
    let storage;
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

// possibilité d'utiliser la méthode JSONP (hack)

/*fetch('https://api.deezer.com/search?q=eminem')
    .then(response => response.jsoon())
    .then(musiques => {
        document.querySelector('#results').innerHTML =
            musiques.map(m => m.title).join('<br>');
    });*/

    $.ajax({
        url : 'https://api.deezer.com/search?q=eminem&output=jsonp',
        dataType : 'jsonp'
    }).done(function(results) {
        console.log(results);
    });