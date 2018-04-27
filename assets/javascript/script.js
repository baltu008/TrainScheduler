src = "https://www.gstatic.com/firebasejs/4.13.0/firebase.js"

var trainMessageArray = [];

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
        freq: trainFrequency,
        updatedTime: ""
    };

    // Upload train data to database
    database.ref().push(newTrain);

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
    var startTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().freq;

    var startTimeCalculated = moment(startTime, "HH:mm").subtract(1, "years");

    // set Current time
    var currentTime = moment();

    // total minutes = current time - start time
    var totalMinutesPast = moment().diff(moment(startTimeCalculated), "minutes");

    // determined remainder for next arrival in "minutes"
    var moduloRemainder = totalMinutesPast % trainFrequency;

    // finalize train arriving in x minutes
    var minutesAway = trainFrequency - moduloRemainder;

    // determine next arrival time
    var nextArrivalTime = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextArrivalTime).format("hh:mm a");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>");
});

