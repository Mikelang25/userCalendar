
var dayOfWeekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
$.each(dayOfWeekArray, function () {
  $('#userActivityDayDetails')
    .append($('<option></option>')
      .attr('value', this)
      .text(this))
})

var timeOfDayArray = ['5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
$.each(timeOfDayArray, function () {
  $('#userActivityTimeStart')
    .append($('<option></option>')
      .attr('value', this)
      .text(this))
})
$.each(timeOfDayArray, function () {
  $('#userActivityTimeEnd')
    .append($('<option></option>')
      .attr('value', this)
      .text(this))
})

function parkVisit () {
  console.log('user activity/city/state submitted')
  $('.userViewActivityPanelHeader').html('Choose the Park you want to visit by clicking on the panel:')

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

  var queryURL = 'https://developer.nps.gov/api/v1/parks?stateCode= ' + userState + '&api_key=MRl4qVq0b1OdDoGngNGIlqvv0ibuzConLl21v9s0&limit=5'
  $.ajax({
    url: queryURL,
    method: 'GET'

  }).then(function (response) {
    for (k = 0; k < response.data.length; k++) {
      $('.userViewActivityPanel')
        .append($('<div>')
          .attr('class', 'destinationDiv')
        // .attr("data-toggle", "modal")
        // .attr("data-target", "#modalForUserFinalEntry")
          .prop('activityCategory', userChoice)
          .prop('name', response.data[k].fullName)
          .attr('id', k)
          .html(response.data[k].fullName + '<br>')
          .append('______________________________________________' + '<br>')
          .append(response.data[k].description + '<br>')
        )
    }
    destinationDivClick()
  })
}
function concertVisit () {
  console.log('user activity/city/state submitted')
  $('.userViewActivityPanelHeader').html('Choose the Concert you want to go to by clicking on the panel:')

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

  var queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&stateCode=' + userState + '&classificationName=music&size=5&sort=date,asc'
  $.ajax({
    url: queryURL,
    method: 'GET'

  }).then(function (response) {
    var k = 0
    for (k = 0; k < response._embedded.events.length; k++) {
      // convert date to day of week
      var dateArray = response._embedded.events[k].dates.start.localDate.split('-')
      var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0].slice(-2)
      var date = new Date(newDate)
      var eventDayOfWeek = (dayOfWeekArray[date.getDay()])
      // convert end time to 2 hours after start time
      var convertStartTime = []
      if (response._embedded.events[k].dates.start.localTime) {
        var startTime = response._embedded.events[k].dates.start.localTime
        convertStartTime = startTime.split(':')
        var endTime = parseInt(convertStartTime[0]) + 2
        var newEndTime = endTime.toString() + ':00:00'
        console.log(newEndTime)
      }

      $('.userViewActivityPanel')
        .append($('<div>')
          .attr('class', 'destinationDiv')
        // .attr("data-toggle", "modal")
        // .attr("data-target", "#modalForUserFinalEntry")
          .prop('activityCategory', userChoice)
          .prop('name', response._embedded.events[k].name)
          .attr('date', response._embedded.events[k].dates.start.localDate)
          .prop('stTime', response._embedded.events[k].dates.start.localTime)
          .prop('enTime', newEndTime)
          .prop('eventDayOfWeek', eventDayOfWeek)
          .attr('id', k)
          .html(response._embedded.events[k].name + '<br>')
          .append('______________________________________________' + '<br>')
          .append('Date: ' + newDate + '<br>')
          .append('Start time: ' + response._embedded.events[k].dates.start.localTime + '<br>')
          .append('Venue: ' + response._embedded.events[k]._embedded.venues[0].name + '<br')
        )
    }
    destinationDivClick()
  })
}

function sportingEventVisit () {
  console.log('user activity/city/state submitted')
  $('.userViewActivityPanelHeader').html('Choose the Sporting Event you want to go to by clicking on the panel:')

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

  var queryURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=hGtmloUfXclhlsbB8qOS8heLAnruvrCq&stateCode=' + userState + '&classificationName=sports&size=5&sort=date,asc'
  $.ajax({
    url: queryURL,
    method: 'GET'

  }).then(function (response) {
    for (k = 0; k < response._embedded.events.length; k++) {
      // convert date to day of week
      var dateArray = response._embedded.events[k].dates.start.localDate.split('-')
      var newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0].slice(-2)
      var date = new Date(newDate)
      var eventDayOfWeek = (dayOfWeekArray[date.getDay()])
      console.log(eventDayOfWeek)
      // convert end time to 2 hours after start time
      convertStartTime = []
      if (response._embedded.events[k].dates.start.localTime) {
        var startTime = response._embedded.events[k].dates.start.localTime
        convertStartTime = startTime.split(':')
        var endTime = parseInt(convertStartTime[0]) + 2
        var newEndTime = endTime.toString() + ':00:00'
        console.log(newEndTime)
      }

      $('.userViewActivityPanel')
        .append($('<div>')
          .attr('class', 'destinationDiv')
        // .attr("data-toggle", "modal")
        // .attr("data-target", "#modalForUserFinalEntry")
          .prop('activityCategory', userChoice)
          .prop('name', response._embedded.events[k].name)
          .attr('date', response._embedded.events[k].dates.start.localDate)
          .prop('stTime', response._embedded.events[k].dates.start.localTime)
          .prop('enTime', newEndTime)
          .prop('eventDayOfWeek', eventDayOfWeek)
          .attr('id', k)
          .html(response._embedded.events[k].name + '<br>')
          .append('______________________________________________' + '<br>')
          .append('Date: ' + newDate + '<br>')
          .append('Start time: ' + response._embedded.events[k].dates.start.localTime + '<br>')
          .append('Venue: ' + response._embedded.events[k]._embedded.venues[0].name + '<br')
        )
    }
    destinationDivClick()
  })
}

function restaurantVisit () {
  console.log('user activity/city/state submitted')
  $('.userViewActivityPanelHeader').html('Choose the Restaurant you want to go to by clicking on the panel:')

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

  var googleApiLocationFromUser = userCity + ',+' + userState

  // google geocoder api

  var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + googleApiLocationFromUser + '&key=AIzaSyCheoKbISc98mPJWu4Df6thXWbRzxE16TE'
  $.ajax({
    url: queryURL,
    method: 'GET'

  }).then(function (response) {
    console.log(response)

    var lat = response.results[0].geometry.location.lat
    var lon = response.results[0].geometry.location.lng

    // zomato api
    var queryURL = 'https://developers.zomato.com/api/v2.1/search?count=5&lat=' + lat + '&lon=' + lon + '&sort=rating'
    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: { Accept: 'application/json', 'user-key': 'e1b108df2ae90b2dfeadd7f9e23a7b52' }
    }).then(function (response) {
      console.log(response.restaurants)
      for (k = 0; k < response.restaurants.length; k++) {
        $('.userViewActivityPanel')
          .append($('<div>')
            .attr('class', 'destinationDiv')
          // .attr("data-toggle", "modal")
          // .attr("data-target", "#modalForUserFinalEntry")
            .prop('activityCategory', userChoice)
            .prop('name', response.restaurants[k].restaurant.name)
            .attr('id', k)
            .html(response.restaurants[k].restaurant.name + '<br>')
            .append('______________________________________________' + '<br>')
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

function userGeneratedEvent () {
  console.log('user activity/city/state submitted')

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

  $('#modalForUserFinalEntry').modal('show')
  $('#locationFromActivityPanelInput').html('')
  $('#dayOfWeekFromActivityPanelInput').html('')
  $('#startTimeFromActivityPanelInput').html('')
  $('#endTimeFromActivityPanelInput').html('')

  userFinalEventEntrySubmitButton()
}

$('#userSubmitInitialActivityButton').on('click', function (userEnterActivityCityState) {
  event.preventDefault()

  var userChoice = $('#userActivityChoice').val()
  var userCity = $('#userCity').val()
  var userState = $('#userState').val()
  console.log(userChoice, userCity, userState)

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

function destinationDivClick () {
  $('.destinationDiv').on('click', function () {
    console.log('destination div clicked')

    var nameForDatabase = this.name
    console.log(nameForDatabase)
    var dayOfWeekForDatabase = this.eventDayOfWeek
    console.log(dayOfWeekForDatabase)
    var startTimeForDatabase = this.stTime
    console.log(startTimeForDatabase)

    var endTimeForDatabase = this.enTime
    console.log(endTimeForDatabase)

    $('#modalForUserFinalEntry').modal('show')
    $('#locationFromActivityPanelInput').html(nameForDatabase)
    $('#dayOfWeekFromActivityPanelInput').val(dayOfWeekForDatabase)
    $('#startTimeFromActivityPanelInput').val(startTimeForDatabase)
    $('#endTimeFromActivityPanelInput').val(endTimeForDatabase)

    // $("#activityCategoryFromActivityPanel").append("<br>" + activityCategoryForDatabase);
    userFinalEventEntrySubmitButton()
  })
}
function userFinalEventEntrySubmitButton () {
  $('#userFinalEventEntrySubmitButton').on('click', function (event) {
    event.preventDefault()
    var convertingStartTimeToInteger = $('#startTimeFromActivityPanelInput').val()
    convertingStartTimeToInteger = convertingStartTimeToInteger.split(':')[0]
    console.log(convertingStartTimeToInteger)
    var convertingEndTimeToInteger = $('#endTimeFromActivityPanelInput').val()
    convertingEndTimeToInteger = convertingEndTimeToInteger.split(':')[0]
    console.log(convertingEndTimeToInteger)

    var newTask = {
      user_id: 7,
      task_name: $('#locationFromActivityPanelInput').val(),
      task_day: $('#dayOfWeekFromActivityPanelInput').val(),
      task_stime: convertingStartTimeToInteger,
      task_etime: convertingEndTimeToInteger,
      task_comment: $('#commentFromActivityPanelInput').val()
    }
    console.log(newTask)
    // Send the POST request.
    $.ajax('/api/tasks', {
      type: 'POST',
      data: newTask

    }).then(
      function (data) {
        console.log(data)
        console.log('Added new task')
        // Reload the page to get the updated list
        location.reload()
      }
    )
  })
}
