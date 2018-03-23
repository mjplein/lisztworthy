$(document).ready(function() {

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

    //create click button to add music
    $("#artist").on("click", function() {
        event.preventDefault();
    })
    $("#song").on("click", function() {

    })
    $("#date").on("click", function() {

    })

































});