


$(function() {
    
    console.log(localStorage);
    
    
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
