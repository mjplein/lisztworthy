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
  
        // Creating an AJAX call to retrieve "artist" data from API
        function getArtistID(artistName) {

        $.ajax({
            dataType: "jsonp",
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&limit=10&api_key=1e38e427c82a703f191ad24ab52e8145&format=json",
        }).then(function(response) {
            var results = response.similarartists.artist;
            for (var i = 0; i < results.length; i++) {
            console.log(results[i].name)
            }
        })
    }

        // Creating an AJAX call to retrieve "song" data from API
        function getArtistSong(artistName, song) {

        $.ajax({
            dataType: "jsonp",
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artistName + "&track=" + song + "&limit=30&api_key=1e38e427c82a703f191ad24ab52e8145&format=json",
        }).then(function(response) {
            var results = response.similartracks.track
            for (var i = 0; i < results.length; i++) {
            console.log(results[i].artist.name, " - ", results[i].name)
        }
        })
    }

        // Creating an AJAX call to retrieve "genre" data from API
        function getGenreID(genreName) {

        $.ajax({
            dataType: "jsonp",
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=" + genreName + "&limit=10&api_key=1e38e427c82a703f191ad24ab52e8145&format=json",
        }).then(function(response) {
            var results = response.topartists.artist;
            for (var i = 0; i < results.length; i++) {
            console.log(results[i].name)
            }
        })
    }
    
    //create click button to add music
    $("#artistB").on("click", function() {
        //var input
        event.preventDefault();
        var artistName = $("#artists").val().trim();
        getArtistID(artistName);
        console.log(artistName);
        });
    $("#songA").on("click", function() {
        //var input
        event.preventDefault();
        var song = $("#songs").val().trim();
        var artistName = $("#artists").val().trim();
        getArtistSong(artistName, song);
        console.log(artistName, song);
        });
    $("#genreA").on("click", function() {
        //var input
        event.preventDefault();
        var genre = $("#genres").val().trim();
        getGenreID(genre);
        console.log(genre);
        });
})