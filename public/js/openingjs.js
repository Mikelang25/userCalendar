
$('#modalForUserLogin').modal('show')
$('#newUserSubmitButtonForNewUserModal').on('click', function (event) {
  event.preventDefault()
  console.log('New User data entry modal show')
  $('#modalForUserLogin').modal('hide')
  $('#modalForNewUserEntry').modal('show')
})

$('#newUserSubmitButtonEntry').on('click', function (event) {
  event.preventDefault()
  console.log('New User Submitting data')

  var newUser = {
  
    user_fname: $('#newUserFirstNameEntry').val(),
    user_lname: $('#newUserLastNameEntry').val(),
    user_email: $('#newUserEmailEntry').val(),
    user_pw: $('#newUserPasswordEntry').val(),
    user_un: $('#newUserUserNameEntry').val()
  }
  console.log(newUser)
  // Send the POST request.
  $.ajax('/api/users', {
    type: 'POST',
    data: newUser

  }).then(
    function (data) {
      console.log(data)
      console.log('Added new user')
   localStorage.setItem('userIdForCalendarStart',data.id);
      

      // Reload the page to the calendar.html      
      window.location.assign("http://localhost:8080/calendar")
    }
  )
})
