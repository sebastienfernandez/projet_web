$(function() {

    // champ titre focus d'entrée de jeu

    $("#title").focus();
    

    //liste des titres eminem lors du clic

    $("#button-submit").click(function() {
        console.log("j'ai cliqué!");
        $.ajax({
            url : 'https://api.deezer.com/search?q=' + $("#title").val() + '&output=jsonp',
            dataType : 'jsonp'
        }).done(function(musiques) {
        
            console.log(musiques);
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => '<h3>' + m.title + '</h3>' 
                    + '<span class="artist-name">' + m.artist.name +'</span>'
                    + '<p>' + m.album.title + '</p>')
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
    })
    
});
