var dayOfWeekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
for (i = 0; i < dayOfWeekArray.length; i++) {
    $('#weekDayOptions').append($('<option>', {
        value: dayOfWeekArray[i],
        text: dayOfWeekArray[i]
    }));
}

var timeOfDayArray = ['5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']

for (k = 0; k < timeOfDayArray.length - 1; k++) {
    $('#startTimeOptions').append($('<option>', {
        value: timeOfDayArray[k],
        text: timeOfDayArray[k]
    }));
}
for (e = 1; e < timeOfDayArray.length; e++) {
    $('#endTimeOptions').append($('<option>', {
        value: timeOfDayArray[e],
        text: timeOfDayArray[e]
    }));
}
//define function: convert day of week to lower case for database entry
function convertDayOfWeekToLowerCaseForDatabaseEntry() {
    dayOfWeekFromOptionList = $("#weekDayOptions").val();
    dayOfWeekFromOptionList = dayOfWeekFromOptionList.toLowerCase();
}


//convert start time entered to integer for database entry
function convertStartTimeToIntegerForDatabaseEntry() {

    startTimeToInteger = $('#startTimeOptions').val()
    convertingStartTimeToArray = startTimeToInteger.split("")
    if (startTimeToInteger == "12pm") {
        startTimeToInteger = parseInt(convertingStartTimeToArray[0].concat(convertingStartTimeToArray[1]))
    } else if (convertingStartTimeToArray.length == 3) {
        if (convertingStartTimeToArray[1] == "a") {
            startTimeToInteger = parseInt(convertingStartTimeToArray[0])
        } else {
            startTimeToInteger = parseInt(convertingStartTimeToArray[0]) + 12
        }
    } else if (convertingStartTimeToArray.length == 4) {
        if (convertingStartTimeToArray[2] == "a") {
            startTimeToInteger = parseInt(convertingStartTimeToArray[0].concat(convertingStartTimeToArray[1]))
        } else {
            startTimeToInteger = parseInt(convertingStartTimeToArray[0].concat(convertingStartTimeToArray[1])) + 12
        }
    }
}
//convert end time entered to integer for database entry
function convertEndTimeToIntegerForDatabaseEntry() {
    endTimeToInteger = $('#endTimeOptions').val()
    convertingEndTimeToArray = endTimeToInteger.split("")
    if (endTimeToInteger == "12pm") {
        endTimeToInteger = parseInt(convertingEndTimeToArray[0].concat(convertingEndTimeToArray[1]))
    } else if (convertingEndTimeToArray.length == 3) {
        if (convertingEndTimeToArray[1] == "a") {
            endTimeToInteger = parseInt(convertingEndTimeToArray[0])
        } else {
            endTimeToInteger = parseInt(convertingEndTimeToArray[0]) + 12
        }
    } else if (convertingEndTimeToArray.length == 4) {
        if (convertingEndTimeToArray[2] == "a") {
            endTimeToInteger = parseInt(convertingEndTimeToArray[0].concat(convertingEndTimeToArray[1]))
        } else {
            endTimeToInteger = parseInt(convertingEndTimeToArray[0].concat(convertingEndTimeToArray[1])) + 12
        }
    }
}

function parkVisit() {
    console.log('user activity/city/state submitted')
    $('.userViewActivityPanelHeader').html('Click an event to schedule:')

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    var queryURL = 'https://developer.nps.gov/api/v1/parks?stateCode= ' + userState + '&api_key=MRl4qVq0b1OdDoGngNGIlqvv0ibuzConLl21v9s0&limit=5'
    $.ajax({
        url: queryURL,
        method: 'GET'

    }).then(function(response) {
        for (k = 0; k < response.data.length; k++) {
            $('.userViewActivityPanel')
                .append($('<div>')
                    .attr('class', 'destinationDiv')
                    .prop('activityCategory', userChoice)
                    .prop('name', response.data[k].fullName)
                    .attr('id', k)
                    .html(response.data[k].fullName + '<br>')
                    .append('____________________' + '<br>')
                    .append(response.data[k].description + '<br>')
                )
        }
        destinationDivClick()
    })
}

function concertVisit() {
    console.log('user activity/city/state submitted')
    $('.userViewActivityPanelHeader').html('Click an event to schedule:')

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    var queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&stateCode=' + userState + '&classificationName=music&size=5&sort=date,asc'
    $.ajax({
        url: queryURL,
        method: 'GET'

    }).then(function(response) {
        var k = 0
        for (k = 0; k < response._embedded.events.length; k++) {
            // convert date to day of week
            dateArray = response._embedded.events[k].dates.start.localDate.split('-')
            newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0].slice(-2)
            date = new Date(newDate)
            eventDayOfWeek = (dayOfWeekArray[date.getDay()])
            console.log(eventDayOfWeek)

            // convert start time to drop down style (eg) 2pm
            convertStartTime = []
            startTime = "";
            newStartTime = "";
            startTimeToString = "";
            endTimeToString = "";

            if (response._embedded.events[k].dates.start.localTime) {
                startTime = response._embedded.events[k].dates.start.localTime
                convertStartTime = startTime.split(':')
                newStartTime = parseInt(convertStartTime[0])
                console.log(newStartTime)
                am = "am"
                pm = "pm"
                if (newStartTime == 12) {
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(pm)
                    console.log(startTimeToString)

                } else if (newStartTime > 5 && newStartTime < 12) {
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(am)
                    console.log(startTimeToString)
                } else if (newStartTime > 12 && newStartTime < 22) {
                    newStartTime = newStartTime - 12
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(pm)
                    console.log(startTimeToString)
                }
                // convert end time to drop down style (eg) 2pm
                startTime = response._embedded.events[k].dates.start.localTime
                convertStartTime = startTime.split(':')
                newStartTime = parseInt(convertStartTime[0])
                console.log(newStartTime)
                newEndTime = newStartTime + 2
                am = "am"
                pm = "pm"
                if (newEndTime == 12) {
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(pm)
                    console.log(endTimeToString)

                } else if (newEndTime > 6 && newEndTime < 12) {
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(am)
                    console.log(endTimeToString)
                } else if (newEndTime > 12 && newEndTime <= 23) {
                    newEndTime = newEndTime - 12
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(pm)
                    console.log(endTimeToString)
                }

            }

            $('.userViewActivityPanel')
                .append($('<div>')
                    .attr('class', 'destinationDiv')
                    .prop('activityCategory', userChoice)
                    .prop('name', response._embedded.events[k].name)
                    .attr('date', response._embedded.events[k].dates.start.localDate)
                    .prop('stTime', startTimeToString)
                    .prop('enTime', endTimeToString)
                    .prop('eventDayOfWeek', eventDayOfWeek)
                    .attr('id', k)
                    .html(response._embedded.events[k].name + '<br>')
                    .append('____________________' + '<br>')
                    .append('Date: ' + newDate + '<br>')
                    .append('Start time: ' + response._embedded.events[k].dates.start.localTime + '<br>')
                    .append('Venue: ' + response._embedded.events[k]._embedded.venues[0].name + '<br')
                )
        }
        destinationDivClick()
    })
}

function sportingEventVisit() {
    console.log('user activity/city/state submitted')
    $('.userViewActivityPanelHeader').html('Click an event to schedule:')

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    var queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&stateCode=' + userState + '&classificationName=sports&size=5&sort=date,asc'
    $.ajax({
        url: queryURL,
        method: 'GET'

    }).then(function(response) {
        for (k = 0; k < response._embedded.events.length; k++) {
            // convert date to day of week
            var dateArray = response._embedded.events[k].dates.start.localDate.split('-')
            var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0].slice(-2)
            var date = new Date(newDate)
            var eventDayOfWeek = (dayOfWeekArray[date.getDay()])
            console.log(eventDayOfWeek)

            // convert start time to drop down style (eg) 2pm
            convertStartTime = []
            startTime = "";
            newStartTime = "";
            startTimeToString = "";
            endTimeToString = "";

            if (response._embedded.events[k].dates.start.localTime) {
                startTime = response._embedded.events[k].dates.start.localTime
                convertStartTime = startTime.split(':')
                newStartTime = parseInt(convertStartTime[0])
                console.log(newStartTime)
                am = "am"
                pm = "pm"
                if (newStartTime == 12) {
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(pm)
                    console.log(startTimeToString)

                } else if (newStartTime > 5 && newStartTime < 12) {
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(am)
                    console.log(startTimeToString)
                } else if (newStartTime > 12 && newStartTime < 22) {
                    newStartTime = newStartTime - 12
                    startTimeToString = newStartTime.toString();
                    startTimeToString = startTimeToString.concat(pm)
                    console.log(startTimeToString)
                }
                // convert end time to drop down style (eg) 2pm
                startTime = response._embedded.events[k].dates.start.localTime
                convertStartTime = startTime.split(':')
                newStartTime = parseInt(convertStartTime[0])
                console.log(newStartTime)
                newEndTime = newStartTime + 2
                am = "am"
                pm = "pm"
                if (newEndTime == 12) {
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(pm)
                    console.log(endTimeToString)

                } else if (newEndTime > 6 && newEndTime < 12) {
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(am)
                    console.log(endTimeToString)
                } else if (newEndTime > 12 && newEndTime <= 23) {
                    newEndTime = newEndTime - 12
                    endTimeToString = newEndTime.toString();
                    endTimeToString = endTimeToString.concat(pm)
                    console.log(endTimeToString)
                }

            }

            $('.userViewActivityPanel')
                .append($('<div>')
                    .attr('class', 'destinationDiv')
                    .prop('activityCategory', userChoice)
                    .prop('name', response._embedded.events[k].name)
                    .attr('date', response._embedded.events[k].dates.start.localDate)
                    .prop('stTime', startTimeToString)
                    .prop('enTime', endTimeToString)
                    .prop('eventDayOfWeek', eventDayOfWeek)
                    .attr('id', k)
                    .html(response._embedded.events[k].name + '<br>')
                    .append('____________________' + '<br>')
                    .append('Date: ' + newDate + '<br>')
                    .append('Start time: ' + response._embedded.events[k].dates.start.localTime + '<br>')
                    .append('Venue: ' + response._embedded.events[k]._embedded.venues[0].name + '<br')
                )
        }
        destinationDivClick()
    })
}

function restaurantVisit() {
    console.log('user activity/city/state submitted')
    $('.userViewActivityPanelHeader').html('Click an event to schedule:')

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    var googleApiLocationFromUser = userCity + ',+' + userState

    // google geocoder api

    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + googleApiLocationFromUser + '&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE'
    $.ajax({
        url: queryURL,
        method: 'GET'

    }).then(function(response) {

        var lat = response.results[0].geometry.location.lat
        var lon = response.results[0].geometry.location.lng

        // zomato api
        var queryURL = 'https://developers.zomato.com/api/v2.1/search?count=5&lat=' + lat + '&lon=' + lon + '&sort=rating'
        $.ajax({
            url: queryURL,
            method: 'GET',
            headers: { Accept: 'application/json', 'user-key': 'e1b108df2ae90b2dfeadd7f9e23a7b52' }
        }).then(function(response) {

            for (k = 0; k < response.restaurants.length; k++) {
                $('.userViewActivityPanel')
                    .append($('<div>')
                        .attr('class', 'destinationDiv')
                        .prop('activityCategory', userChoice)
                        .prop('name', response.restaurants[k].restaurant.name)
                        .attr('id', k)
                        .html(response.restaurants[k].restaurant.name + '<br>')
                        .append('____________________' + '<br>')
                        .append('Cuisine: ' + response.restaurants[k].restaurant.cuisines + '<br>')
                        .append('Average user rating: ' + response.restaurants[k].restaurant.user_rating.aggregate_rating + '<br>')
                        .append('Average Cost for Two: $' + response.restaurants[k].restaurant.average_cost_for_two + '<br>')
                        .append('Address: ' + response.restaurants[k].restaurant.location.address + '<br>')

                    )
            }
            destinationDivClick()
        })
    })
}

function userGeneratedEvent() {
    console.log('user activity/city/state submitted')

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    $('#modalForUserFinalEntry').modal('show')
    $('#locationFromActivityPanelInput').html('')
    $('#dayOfWeekFromActivityPanelInput').html('')
    $('#startTimeFromActivityPanelInput').html('')
    $('#endTimeFromActivityPanelInput').html('')

    userFinalEventEntrySubmitButton()
}

$('#userSubmitInitialActivityButton').on('click', function() {
    event.preventDefault()

    var userChoice = $('#userActivityChoice').val()
    var userCity = $('#userCity').val()
    var userState = $('#userState').val()

    switch (userChoice) {
        case 'goForAHike':
            parkVisit()
            break
        case 'goToConcert':
            concertVisit()
            break

        case 'goToSportingEvent':
            sportingEventVisit()
            break

        case 'goOutToEat':
            restaurantVisit()
            break

        case 'userGeneratedEvent':
            userGeneratedEvent()

        default:
            break
    }
})

function destinationDivClick() {
    $('.destinationDiv').on('click', function() {
        console.log('destination div clicked')

        var nameForDatabase = this.name
        if (this.eventDayOfWeek) {
            var dayOfWeekForDatabase = this.eventDayOfWeek

        }
        var startTimeForDatabase = this.stTime
        var endTimeForDatabase = this.enTime

        $('#modalForUserFinalEntry').modal('show')
        $('#locationFromActivityPanelInput').html(nameForDatabase)
        $('#weekDayOptions').val(dayOfWeekForDatabase)
        $('#startTimeOptions').val(startTimeForDatabase)
        $('#endTimeOptions').val(endTimeForDatabase)

        $("#modalCloseX").on('click', function() {
            window.location.href = "/calendar";
        })

        userFinalEventEntrySubmitButton()
    })
}

function userFinalEventEntrySubmitButton() {
    $('#userFinalEventEntrySubmitButton').on('click', function(event) {
        event.preventDefault()
        var userIdForNewTaskFromLocalStorage = localStorage.getItem('userIdForCalendarStart');
        console.log(userIdForNewTaskFromLocalStorage);

        convertDayOfWeekToLowerCaseForDatabaseEntry();
        convertStartTimeToIntegerForDatabaseEntry();
        convertEndTimeToIntegerForDatabaseEntry()
        console.log(dayOfWeekFromOptionList)
        console.log(startTimeToInteger)
        console.log(endTimeToInteger)
        var newTask = {
            user_id: userIdForNewTaskFromLocalStorage,
            task_name: $('#locationFromActivityPanelInput').val(),
            task_day: dayOfWeekFromOptionList,
            task_stime: startTimeToInteger,
            task_etime: endTimeToInteger,
            task_comment: $('#commentFromActivityPanelInput').val()
        }

        // Send the POST request.
        $.ajax('/api/tasks', {
            type: 'POST',
            data: newTask

        }).then(
            function(data) {
                console.log(data[0])
                console.log('Added new task')
                    // Reload the page to get the updated list
                location.reload()
            }
        )
    })
}