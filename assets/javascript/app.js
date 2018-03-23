$(document).ready(function () {

    // displayArtist function re-renders the HTML to display the "artist" content
    function searchByArtist(artist) {

        var artistBtn = $(this).attr("data-name");
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=porcupine+tree&api_key=1e38e427c82a703f191ad24ab52e8145&format=json";
        console.log(queryURL)

        // Creating an AJAX call for the "artist" button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

    // displayArtist function re-renders the HTML to display the "track" content
    function searchBySong(song) {

        var trackBtn = $(this).attr("data-name");
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=opeth&track=coil&api_key=1e38e427c82a703f191ad24ab52e8145&format=json";
        console.log(queryURL)

        // Creating an AJAX call for the "track" button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

    // displayArtist function re-renders the HTML to display the "genre" content
    function searchByGenre(genre) {

        var genreBtn = $(this).attr("data-name");
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=comedy&api_key=1e38e427c82a703f191ad24ab52e8145&format=json";
        console.log(queryURL)

        // Creating an AJAX call for the "genre" button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
