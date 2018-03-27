//initialize firebase
var config = {
    apiKey: "AIzaSyDanofEE9ukK5dxUjIAlcVVpkA4CfD_cC0",
    authDomain: "lisztworthy.firebaseapp.com",
    databaseURL: "https://lisztworthy.firebaseio.com",
    projectId: "lisztworthy",
    storageBucket: "lisztworthy.appspot.com",
    messagingSenderId: "27323128138"
};
firebase.initializeApp(config);


//create variable to link firebase
var database = firebase.database();

$(document).ready(function() {


    // need getArtistID (artistName)
    function artististID(artistName) {
        console.log(artistName);
        //takes argument of artistName and uses it to search Spotify for the ID
        //stores it in a variable
        $.ajax({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=user.getartisttracks&user=rj&artist=" + artistName + "&api_key=d9f57a8c01d3bfe8ec20acf07e35f0df&format=json",
        }).then(function(response) {
            //var spotArtistID = response.items.id
            //var tracks = response.artisttracks.track;

            //for (var i = 0; i < tracks.length; i++) {
            // console.log(tracks[i].name);
            // $("#artistA").append(tracks[i].name);
            //}
        })
    }

    //function songID(artistSong) {
    // console.log(artistSong);


    //create a popover
    $("#artistB").popover({
        //clear the popover
        trigger: 'focus'
    });

    $("#songA").popover({

        //clear the popover
        trigger: 'focus'
    });
    $("#genreA").popover({

        //clear the popover
        trigger: 'focus'
    });


    // need var function spotRecommendArtist    
    //searches for the recommendations using the ID
    //stores list of recommendations    

    //create click button to add music
    $("#artistB").on("click", function() {

        //popover
        //$("#artistB").popover();

        //var input
        event.preventDefault();
        var artist = $("#artists").val().trim();
        console.log(artist);

    });
    $("#songA").on("click", function() {




        event.preventDefault();
        var song = $("#songs").val().trim();
        console.log(song);

    });
    $("#genreA").on("click", function() {

        //var input
        event.preventDefault();
        var genre = $("#genres").val().trim();
        console.log(genre);


    });

































});