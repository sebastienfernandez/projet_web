$(function() {
    $("#title").focus();
    $("#button-submit").click(function() {
        console.log("j'ai cliqué!");
        $.ajax({
            url : 'https://api.deezer.com/search?q=eminem&output=jsonp',
            dataType : 'jsonp'
        }).done(function(musiques) {
        
            console.log(musiques);
        
            document.querySelector('#results').innerHTML =
                    musiques.data.map(m => m.title).join('<br>');
        
        });
    });
    
});
