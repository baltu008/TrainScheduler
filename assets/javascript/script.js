src = "https://www.gstatic.com/firebasejs/4.13.0/firebase.js"

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCmPkmRQci7aKiP-eFVwssDXxPzvzyuTBY",
    authDomain: "train-scheduler-9da87.firebaseapp.com",
    databaseURL: "https://train-scheduler-9da87.firebaseio.com",
    projectId: "train-scheduler-9da87",
    storageBucket: "train-scheduler-9da87.appspot.com",
    messagingSenderId: "114070913113"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button to add train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // temp objects variables
    var newTrain = {
        name: trainName,
        dest: trainDestination,
        time: trainTime,
        freq: trainFrequency
    };

    // Upload train data to database
    database.ref().push(newTrain);

    // Log to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // on click, replace submit with "succesfully added!"
    $("#add-train-btn").html(`Train Successfully Added!`)

    // clear text fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// Create firebase event when adding train and row to DOM table
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Storing in variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().freq;

    // Math for next arrival
    var startTime = moment("12:16 am", "HH:mm a");
    var endTime = moment("06:12 pm", "HH:mm a");
    var diff = endTime.diff(startTime);

    var trainNextArrival = moment('12:20').diff(moment());
    console.log(trainNextArrival);

    // Math for minutes away
    var trainMinutesAway = moment().
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
            trainFrequency + "</td><td>" + trainNextArrival + "</td><td>" + trainMinutesAway + "</td>");
});

