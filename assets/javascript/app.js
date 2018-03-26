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


$(document).ready(function () {

    function callback(response) {
        console.log("Starting Joe's callback");
        console.log("Whole response:", response);
       // console.log("artistID:", response.message.body.artist_list[0].artist.artist_id);
    }

    // need getArtistID (artistName)
    function getArtistID(artistName) {
        //takes argument of artistName and uses it to search Spotify for the ID
        //stores it in a variable
        
        $.ajax(
            {
                dataType: "jsonp",
                method: "GET",
                url: "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=" + artistName + "&apikey=f91a872d67982b6fc40042ee8d751029",
            }).then(function (response) {
                //var mixArtistID = response.body.artist_list[0].artist.artist_id;
                var mixArtistID = response.message.body.artist_list["0"].artist.artist_id;
                //return mixArtistID;
                // getMixRec();
    
                getMixRec(mixArtistID, callback  );

            })
    }
    
    function getMixRec(artistID, callback) {
        var mixResults = [];
        $.ajax(
            {
                dataType: "jsonp",
                method: "GET",
                url: "https://api.musixmatch.com/ws/1.1/artist.related.get?format=jsonp&callback=callback&artist_id=" + artistID + "&apikey=f91a872d67982b6fc40042ee8d751029",
            }).then(function (response) {
                var results = response.message.body.artist_list;

                for (var i = 0; i < results.length; i++) {
                    //var results = response.message.body.artist_list[i];
                    mixResults.push(results[i].artist.artist_name);
                    //console.log("this is inside getMixRec:")
                    
                    //}
                }

                //callback(mixResults)
            }
            )
            //return mixResults;
    }

    

    // need var function spotRecommendArtist    
    //searches for the recommendations using the ID
    //stores list of recommendations    

    //create click button to add music
    $("#artistB").on("click", function () {
        //var input
        event.preventDefault();
        var artist = $("#artists").val().trim();
        getArtistID(artist);
        
    });

    $("#songA").on("click", function () {
        //var input
        event.preventDefault();
        var song = $("#songs").val().trim();
        console.log(song);
    });
    $("#genreA").on("click", function () {
        //var input
        event.preventDefault();
        var genre = $("#genres").val().trim();
        console.log(genre);

    });



});
