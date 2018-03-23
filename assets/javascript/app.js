$(document).ready(function () {

    // displayArtist function re-renders the HTML to display the appropriate content
    function displayArtist() {

        var artistBtn = $(this).attr("data-name");
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=porcupine+tree&api_key=1e38e427c82a703f191ad24ab52e8145&format=json";
        console.log(queryURL)
    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

