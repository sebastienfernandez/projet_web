mesFavoris = localStorage;

function addFavorite(a, b) {
    localStorage.setItem(a, b);
}

addFavorite('heros','hulk');
addFavorite('assistant','thor');
addFavorite('ami','ironman');

console.log(mesFavoris);
