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
var getArtistID = function (artistName) {
    //takes argument of artistName and uses it to search Spotify for the ID
    //stores it in a variable
    $.ajax (
        {
        method: "GET",
        url: "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=100",
        }).then(function (response) {
            var spotArtistID = response.items.id
            console.log (spotArtistID);
        })
}

    
// need var function spotRecommendArtist    
    //searches for the recommendations using the ID
    //stores list of recommendations    
    
    //create click button to add music
    $("#artistB").on("click", function() {
        //var input
        event.preventDefault();
        var artist = $("#artists").val().trim();
        console.log(artist);

    });
    $("#songA").on("click", function() {
        //var input
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

