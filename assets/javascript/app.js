
$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDjXRnoN9RAssmGns2tUEM4Sy2shYT4sSs",
        authDomain: "train-hw-527fc.firebaseapp.com",
        databaseURL: "https://train-hw-527fc.firebaseio.com",
        projectId: "train-hw-527fc",
        storageBucket: "train-hw-527fc.appspot.com",
        messagingSenderId: "612664790401"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

    // grabbing the current time
    // function currentTime() {
    //     var current = moment().format('LLLL');
    //     $("#currentTime").html(current);
    //     setTimeout(currentTime, 1000);
    // };

    // Capture Button Click
    $("#submit").on("click", function (event) {
        event.preventDefault();
        // logic for storing and retrieving the most recent user.
        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrain = $("#traintimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        if (!trainName || !destination || !firstTrain || !frequency) {

            alert("Please add further details for new train");
        } else {
            // placing the value in the empty form feild

            $(".form-control").val("");
            console.log(name, destination, firstTrain, frequency);

            // Code for the push to firebase
            database.ref().push({

                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });





    //   controlling data entries for the form feild
    // $(".form-control").on("keyup", function () {
    //     var name = $("#nameInput").val().trim();
    //     var city = $("#destinationInput").val().trim();
    //     var time = $("#traintimeInput").val().trim();
    //     var frequent = $("#frequencyInput").val().trim();


    // });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childSnapshot) {
        var trainData = childSnapshot.val();
        // Log everything that's coming out of snapshot
        console.log(trainData.trainName);
        console.log(trainData.destination);
        console.log(trainData.firstTrain);
        console.log(trainData.frequency);

        var convertedTime = moment(trainData.firstTrain, "HH:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(convertedTime), "minutes");
        var timeLeft = timeDifference % trainData.frequency;
        var arrivalTime = trainData.frequency - timeLeft;
        
        var newTrain = moment().add(arrivalTime, "minutes");
        console.log("New Train",newTrain)
         newTrain = moment(newTrain).format("HH:mm");
         console.log('Updated new train', newTrain)
        ///var key = childSnapshot.key;


        var newRow = $("<tr>");
        newRow.append("<td>" + trainData.trainName + "</td>");
        newRow.append("<td>" + trainData.destination + "</td>");
        newRow.append("<td>" + trainData.frequency + "</td>");
        newRow.append("<td>" + newTrain + "</td>");
        newRow.append("<td>" + arrivalTime + "</td>");

        // appending a new row for my table body 
        var tableBody = $("tbody")
        tableBody.append(newRow)

    });

    // $(document).on("click", ".")
})

