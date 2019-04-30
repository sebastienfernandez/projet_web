

$(function() {

    //declaration de mon localStorage

    let myFavorites = localStorage;

    // champ titre focus d'entrée de jeu

    $("#title").focus();


    //l'appui de la touche enter déclenche la validation du formulaire

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $("#button-submit").click();
        }
    });

    //liste des titres de musique selon l'artiste lors du clic

    $("#button-submit").click(function() {
        console.log("j'ai cliqué!");
        $.ajax({
            url : 'https://api.deezer.com/search?q=' + $("#title").val() + '&output=jsonp',
            dataType : 'jsonp'
        }).done(function(musiques) {
        
            console.log(musiques);
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => '<div class="results-box"><h3>' + m.title + '</h3>' 
                    + '<img src=' + m.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + m.artist.name +'</span>'
                    + '<p>' + m.album.title + '</p>'
                    + '<audio src=' + m.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    + '<button class="favorite-button"><i class="fas fa-heart"></i>Bouton des favoris</button></div>')
                    .join('<br>');
        
        });

    });

    

    //supression des champs du formulaire 

    $("#button-delete").click(function() {
        $(':input')
        .not(':button, :submit, :reset, :hidden, .form-button')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
    });


    //Ajout des favoris au localStorage

    $("#results").on('click', '.favorite-button', function() {
        localStorage.setItem("title","title one");
        console.log(myFavorites);
    });
    
});
