$('#userSubmitButton1').on('click', function(event) {
    event.preventDefault()

    var returningUserEmailEntered = $("#inputEmail1").val();
    returningUserEmailEntered = returningUserEmailEntered.toLowerCase();
    var returningUserPasswordEntered = $("#inputPassword1").val();

    var k = 0;
    // Send the GET request.
    $.ajax('/api/users', {
        type: 'GET'

    }).then(
        function(data) {
            for (k = 0; k < data.length; k++) {
                if (returningUserEmailEntered == data[k].user_email) {
                    $("#incorrectEntryDiv").text("The email matches.")

                    if (returningUserPasswordEntered == data[k].user_pw) {
                        $("#incorrectEntryDiv").text("The email and password match.")
                        localStorage.setItem('userIdForCalendarStart', data[k].id);
                        window.location.href = "/calendar"
                        break;
                    } else {
                        $("#incorrectEntryDiv").text("The password entered doesn't match the email entered - Please log-in again.")
                        $("#inputEmail1").val('')
                        $("#inputPassword1").val('')
                        break;
                    }
                } else {
                    $("#incorrectEntryDiv").text("There is no account associated with the email entered - Please log-in again.")
                    $("#inputEmail1").val('')
                    $("#inputPassword1").val('')
                }
            }
        })
})

$('#modalForUserLogin').modal('show')
$('#newUserSubmitButtonForNewUserModal').on('click', function(event) {
    event.preventDefault()
    console.log('New User data entry modal show')
    $('#modalForUserLogin').modal('hide')
    $('#modalForNewUserEntry').modal('show')
})
$("#modalCloseX").on('click', function() {
    window.location.href = "/";
})
$('#newUserSubmitButtonEntry').on('click', function(event) {
    event.preventDefault()
    console.log('New User Submitting data')
    var newUserFirstNameEntry = $('#newUserFirstNameEntry').val()
    newUserFirstNameEntry = newUserFirstNameEntry.toLowerCase();
    var newUserLastNameEntry = $('#newUserLastNameEntry').val()
    newUserLastNameEntry = newUserLastNameEntry.toLowerCase();
    var newUserEmailEntry = $('#newUserEmailEntry').val()
    newUserEmailEntry = newUserEmailEntry.toLowerCase();

    var newUser = {
            user_fname: newUserFirstNameEntry,
            user_lname: newUserLastNameEntry,
            user_email: newUserEmailEntry,
            user_pw: $('#newUserPasswordEntry').val(),
            user_un: $('#newUserUserNameEntry').val()
        }
        // Send the POST request.
    $.ajax('/api/users', {
        type: 'POST',
        data: newUser

    }).then(
        function(data) {
            console.log('Added new user')
            localStorage.setItem('userIdForCalendarStart', data.id);
            window.location.href = "/calendar"
        }
    )
})