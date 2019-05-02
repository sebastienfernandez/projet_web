

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
        $.ajax({
            url : 'https://api.deezer.com/search?q=' + $("#title").val() + '&output=jsonp',
            dataType : 'jsonp'
        }).done(function(musiques) {
        
            console.log(musiques);
            let tab = [];
            let i = 0;
            musiques.data.map(m => tab.push(m));
            console.log('mon tableau de musiques : ', tab);
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => '<div class="results-box"><h3>' + m.title + '</h3>' 
                    + '<img src=' + m.album.cover_medium + ' alt="logo couverture" class="music-cover"/>'
                    + '<span class="artist-name">' + m.artist.name +'</span>'
                    + '<p>' + m.album.title + '</p>'
                    + '<audio src=' + m.preview + ' controls>Veuillez mettre à jour votre navigateur ! </audio>'
                    + '<button class="favorite-button">Ajouter aux favoris</button></div>')
                    .join('<br>');
                   
            
            if (musiques.total === 0) {
                document.querySelector('#results').innerHTML =
                    '<p class="p-results">Aucun résultat pour cette recherche...</p>'
            }
        
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
        let choice = $(this).parent();
        localStorage.setItem('titre', choice);
        console.log(myFavorites);
        $(this).removeClass('favorite-button');
        $(this).addClass('alternate');
        $(this).text('Retirer des favoris');
        console.log($(this).attr('class'));
        
    });

    //Retrait des favoris du localStorage

    $("#results").on('click', '.alternate', function() {
        let choice = $(this).parent();
        localStorage.removeItem(choice);
        console.log(myFavorites);
        $(this).removeClass('alternate');
        $(this).addClass('favorite-button');
        $(this).text('Ajouter aux favoris');
        console.log($(this).attr('class'));
        
    });


    
});
