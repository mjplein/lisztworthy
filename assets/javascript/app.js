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




