
 
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://tripadvisor1.p.rapidapi.com/answers/list?limit=10&question_id=5283833",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    //         "x-rapidapi-key": "58493bb433mshd3877b6f9e16f1ep12332ajsn963b290af47d"
    //     }
    // }
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

// var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328"


// Sample Partner URL:

//ticketmaster api for call with stateCode
// var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=CT&size=5&apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq"

//tripadvisor api
//  var queryURL = "http://api.tripadvisor.com/api/partner/2.0/location/89575?key=58493bb433mshd3877b6f9e16f1ep12332ajsn963b290af47d"


//  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=CT&size=1&apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq"
//google geocoder api

// var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=Miami,+FL&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE"
// $.ajax({
//     url: queryURL,
//     method: "GET",
 
// }).then(function (response) {

//    console.log("Latitude: " + response.results[0].geometry.location.lat)
//    console.log("Longitude: " + response.results[0].geometry.location.lng)

// // // // // ticketmaster api call with latitude/longitude

// var latlon = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
// console.log(latlon)
// var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&size=3&classificationName=sports&latlon=" + latlon 
// $.ajax({
// url: queryURL,
// method: "GET"

// }).then(function (response) {
// console.log(response)
//      });
//    });

//ticketmaster api call with specific classificationName (music/sport/play)
// var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports&dmaId=324&apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq"
// $.ajax({
// url: queryURL,
// method: "GET"

// }).then(function (response) {
// console.log(response)
//      });


// zomato api
// var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=40.9167654&lon=-74.17181099999999&size=5"
// $.ajax({
//         url: queryURL,
//         method: "GET",
//         headers: {"Accept":"application/json","user-key":"e1b108df2ae90b2dfeadd7f9e23a7b52"},
//     }).then(function (response) {

//        console.log(response.nearby_restaurants)
        
//         });

// National Parks Service API

// var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=CT&api_key=MRl4qVq0b1OdDoGngNGIlqvv0ibuzConLl21v9s0"
// $.ajax({
//         url: queryURL,
//         method: "GET",
 
//     }).then(function (response) {

//        console.log(response)
        
//         });

var dayOfWeekArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

$.each(dayOfWeekArray, function() {   

    $('#userActivityDayDetails')
        .append($("<option></option>")
                   .attr("value",this)
                   .text(this)); 
});

var timeOfDayArray=["5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"];
$.each(timeOfDayArray, function() {   
 
    $('#userActivityTimeStart')
        .append($("<option></option>")
                   .attr("value",this)
                   .text(this)); 
});
$.each(timeOfDayArray, function() {   
 
    $('#userActivityTimeEnd')
        .append($("<option></option>")
                   .attr("value",this)
                   .text(this)); 
});


//getting a day of the week from a date
{/* <script>
var day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case  6:
    day = "Saturday";
}
document.getElementById("demo").innerHTML = "Today is " + day;
</script> */}


$("#userChoiceSubmitButton").on("click", function (event) {
    event.preventDefault();
    console.log("user details submitted")

    var userChoice = $("#userActivityChoice").val();
var userActivityDay = $("#userActivityDayDetails").val();
var userStartTime = $("#userActivityTimeStart").val();
var userEndTime = $("#userActivityTimeEnd").val();
var userCity = $("#userCity").val();
var userState = $("#userState").val();
console.log(userChoice, userActivityDay, userStartTime, userEndTime, userCity, userState)
switch (userChoice) {
    case "goForAHike":
        console.log(userState);

        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode= "+userState+"&api_key=MRl4qVq0b1OdDoGngNGIlqvv0ibuzConLl21v9s0&limit=5"
        $.ajax({
                url: queryURL,
                method: "GET",
         
            }).then(function (response) {
        
               console.log(response.data)
               for (k=0;k<response.data.length;k++){
                   console.log(response.data[k].fullName);

                        $('.destinationChoice')
                        .append($("<button>")
                        .attr("class","destinationButton")
                        .attr("data-toggle","modal")
                        .attr("data-target","#modalForUserFinalEntry")
                                   .attr("value",response.data[k].fullName)
                                   .text(response.data[k].fullName)
                                   .append(response.data[k].description).after('<br>')
                                  ); 
             
                 
                //    $(".destinationChoice").append(response.data[k].fullName)

               }
               $(".destinationButton").on("click", function (event) {

                $("#finalDestination").append(this.value);
                $("#finalDayOfTheWeek").append(userActivityDay);
                $("#finalStartTime").append(userStartTime);
                $("#finalEndTime").append(userEndTime);
var infoForDatabaseEntry = {
    destination: this.value,
    dayOfEvent: userActivityDay,
    eventStartTime: userStartTime,
    eventEndTime: userEndTime

}
console.log(infoForDatabaseEntry)


               })
                });
        
        break;
    case "goToConcert":
  
var googleApiLocationFromUser = userCity+",+"+userState;
console.log(googleApiLocationFromUser)
//google geocoder api

var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+googleApiLocationFromUser+"&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE";
$.ajax({
    url: queryURL,
    method: "GET",
 
}).then(function (response) {


// // // // ticketmaster api call with latitude/longitude

var latlon = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
console.log(latlon)

var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&"+latlon+"&classificationName=music&size=5" 
$.ajax({
url: queryURL,
method: "GET"

}).then(function (response) {
 

for (k=0;k<response._embedded.events.length;k++){
    console.log(response._embedded.events[k].name);

         $('.destinationChoice')
         .append($("<button>")
         .attr("class","destinationButton")
         .attr("data-toggle","modal")
                        .attr("data-target","#modalForUserFinalEntry")
                    .attr("value",response._embedded.events[k].name)
                    .text(response._embedded.events[k].name)
                   ); 

  
 //    $(".destinationChoice").append(response.data[k].fullName)

}

$(".destinationButton").on("click", function (event) {

    $("#finalDestination").append(this.value);
    $("#finalDayOfTheWeek").append(userActivityDay);
    $("#finalStartTime").append(userStartTime);
    $("#finalEndTime").append(userEndTime);




var infoForDatabaseEntry = {
destination: this.value,
dayOfEvent: userActivityDay,
eventStartTime: userStartTime,
eventEndTime: userEndTime

}
console.log(infoForDatabaseEntry)
});
     })
   });
break;

case "goToSportingEvent":
  
    var googleApiLocationFromUser = userCity+",+"+userState;
    console.log(googleApiLocationFromUser)
    //google geocoder api
    
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+googleApiLocationFromUser+"&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE";
    $.ajax({
        url: queryURL,
        method: "GET",
     
    }).then(function (response) {
        
    // // // // ticketmaster api call with latitude/longitude
    
    var latlon = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
    console.log(latlon)
    
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&"+latlon+"&classificationName=sports&size=5" 
    $.ajax({
    url: queryURL,
    method: "GET"
    
    }).then(function (response) {
        console.log(response)
     
    
    for (k=0;k<response._embedded.events.length;k++){
        console.log(response._embedded.events[k].name);
    
             $('.destinationChoice')
             .append($("<button>")
             .attr("class","destinationButton")
             .attr("data-toggle","modal")
                            .attr("data-target","#modalForUserFinalEntry")
                        .attr("value",response._embedded.events[k].name)
                        .text(response._embedded.events[k].name)
                       ); 
    
       }
    
    $(".destinationButton").on("click", function (event) {
    
        $("#finalDestination").append(this.value).attr("<button>");
        $("#finalDayOfTheWeek").append(userActivityDay);
        $("#finalStartTime").append(userStartTime);
        $("#finalEndTime").append(userEndTime);
        
    var infoForDatabaseEntry = {
    destination: this.value,
    dayOfEvent: userActivityDay,
    eventStartTime: userStartTime,
    eventEndTime: userEndTime
    
    }
    console.log(infoForDatabaseEntry)
    });
         })
       });
    break;
 
    case "goOutToEat":
  
        var googleApiLocationFromUser = userCity+",+"+userState;
        console.log(googleApiLocationFromUser)
        //google geocoder api
        
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+googleApiLocationFromUser+"&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE";
        $.ajax({
            url: queryURL,
            method: "GET",
         
        }).then(function (response) {
    
        var lat = response.results[0].geometry.location.lat
        var lon = response.results[0].geometry.location.lng
        console.log(lat)
        console.log(lon)
// zomato api
var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat="+lat+"&lon="+lon+"&size=5"
$.ajax({
        url: queryURL,
        method: "GET",
        headers: {"Accept":"application/json","user-key":"e1b108df2ae90b2dfeadd7f9e23a7b52"},
    }).then(function (response) {

       for (k=0;k<response.nearby_restaurants.length;k++){
        console.log(response.nearby_restaurants[k].restaurant.name);
    
             $('.destinationChoice')
             .append($("<button>")
             .attr("class","destinationButton")
             .attr("data-toggle","modal")
                            .attr("data-target","#modalForUserFinalEntry")
                        .attr("value",response.nearby_restaurants[k].restaurant.name)
                        .text(response.nearby_restaurants[k].restaurant.name)
                        ); 
       }
       $(".destinationButton").on("click", function (event) {
    
        $("#finalDestination").append(this.value);
        $("#finalDayOfTheWeek").append(userActivityDay);
        $("#finalStartTime").append(userStartTime);
        $("#finalEndTime").append(userEndTime);

                                var infoForDatabaseEntry = {
                                destination: this.value,
                                dayOfEvent: userActivityDay,
                                eventStartTime: userStartTime,
                                eventEndTime: userEndTime
      }
    console.log(infoForDatabaseEntry)
        });
    })
       
           });
        break;
    




default:
    break;
}

//     function goForAHikeApiCall (){
// userStateForApiCall = userState;
// console.log(userStateForApiCall)




//     }
    });