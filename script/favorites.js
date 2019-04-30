$(function() {
    $("#clear-button").on('click',function() {
        console.log(localStorage);
        localStorage.clear();
        console.log(localStorage);
    });
});
