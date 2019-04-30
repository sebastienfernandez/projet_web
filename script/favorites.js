$(function() {
    $("#clear-button").on('click',function() {
        if (confirm("Voulez vous vraiment supprimer tous vos favoris ?")) {
            localStorage.clear();
            console.log(localStorage);
        } else {
            console.log(localStorage);
        }
        
    });
});
