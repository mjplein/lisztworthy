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
    }

    function saveInfo(data) {
        var musicRef = database.ref("/musicInput")
        console.log("ref", musicRef);
        var newMusicInput = musicRef.push();
        console.log("new key:", newMusicInput.key);
        newMusicInput.set(data);
        console.log("done");
    }

    function compareResults(lfmResults, mixResults) {
        var finalArtistResult = [];
        for (var i = 0; finalArtistResult.length < 6; i++) {
            if (!finalArtistResult.includes(mixResults[i]) && mixResults[i] != undefined) {
                finalArtistResult.push(mixResults[i]);
            }

            if (!finalArtistResult.includes(lfmResults[i]) && lfmResults[i] != undefined) {
                finalArtistResult.push(lfmResults[i]);
            }
        }
        return finalArtistResult;
    }

    // Creating an AJAX call to retrieve "artist" from last.fm API
    function getLfmArtist(artistName, mixResults) {
        var lfmResults = [];
        $.ajax({
            dataType: "jsonp",
            method: "GET",
            url: "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistName + "&limit=10&api_key=1e38e427c82a703f191ad24ab52e8145&format=json",
        }).then(function (response) {
            var results = response.similarartists.artist;
            for (var i = 0; i < results.length; i++) {
                lfmResults.push(results[i].name);
            }

            var finalArtistResult = compareResults(lfmResults, mixResults);
            console.log(finalArtistResult)
            var data = {
                artistName: artistName,
                finalArtistResult: finalArtistResult,
            }
            saveInfo(data);
        })

    }
    // Creating an AJAX call to retrieve "artist ID" from musixmatch API
    function getArtistID(artistName) {
        $.ajax(
            {
                dataType: "jsonp",
                method: "GET",
                url: "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=" + artistName + "&apikey=f91a872d67982b6fc40042ee8d751029",
            }).then(function (response) {
                var mixArtistID = response.message.body.artist_list["0"].artist.artist_id;
                getMixRec(mixArtistID, artistName);
            })
    }

    // Creating an AJAX call to retrieve "artist" from musixmatch API
    function getMixRec(artistID, artistName) {
        var mixResults = [];
        $.ajax(
            {
                dataType: "jsonp",
                method: "GET",
                url: "https://api.musixmatch.com/ws/1.1/artist.related.get?format=jsonp&callback=callback&artist_id=" + artistID + "&apikey=f91a872d67982b6fc40042ee8d751029",
            }).then(function (response) {
                var results = response.message.body.artist_list;
                for (var i = 0; i < results.length; i++) {
                    mixResults.push(results[i].artist.artist_name);
                }
                getLfmArtist(artistName, mixResults);
            })
        console.log(mixResults);
        //return mixResults;
    }

    // Creating an AJAX call to retrieve "song" data from last.fm API
    function getLFMArtistSong(artistName, song) {
        var finalSongResult = [];
        $.ajax({
            dataType: "jsonp",
            method: "GET",
            url: "https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artistName + "&track=" + song + "&limit=10&api_key=1e38e427c82a703f191ad24ab52e8145&format=json",
        }).then(function (response) {
            var results = response.similartracks.track
            for (var i = 0; finalSongResult.length < 6; i++) {
                finalSongResult.push(results[i].artist.name + " - " + results[i].name);
            }
            console.log(finalSongResult)
            var data = {
                artistName: artistName,
                songName: song,
                finalSongResults: finalSongResult
            }
            saveInfo(data);
        })
    }

    //create click button to add music
    $("#artistB").on("click", function () {
        //var input
        event.preventDefault();
        var artistName = $("#artists").val().trim();
        $("#artistB").val("")
        getArtistID(artistName);
        console.log(artistName);

    })

    $("#songA").on("click", function () {
        //var input
        event.preventDefault();
        var song = $("#songs").val().trim();
        var artistName = $("#artists").val().trim();
        $("#songA").val("")
        getLFMArtistSong(artistName, song);
        // console.log(artistName, song);
    })
});

database.ref("/musicInput").on("child_added", function (snapshot) {
    var searchedArtist = snapshot.val().artistName;
    console.log(searchedArtist)
    var searchedSong = snapshot.val().songName;
    console.log(searchedSong)
    var artistResults = snapshot.val().finalArtistResult;
    console.log(artistResults)
    var songResults = snapshot.val().finalSongResults;
    console.log(songResults)


    if (searchedSong == undefined) {
        $(".table").prepend(
            "<tr><td>" + searchedArtist +
            "</td><td>" + "" +
            "</td><td>" + artistResults.join(" - ") + "</td></tr>");
    }
    else {
        $(".table").prepend(
            "<tr><td>" + searchedArtist +
            "</td><td>" + searchedSong +
            "</td><td>" + songResults.join(" ; ") + "</td></tr>");
    }
});