$('#userSubmitButton1').on('click', function(event) {
    event.preventDefault()

    var returningUserEmailEntered = $("#inputEmail1").val();
    returningUserEmailEntered = returningUserEmailEntered.toLowerCase();
    console.log(returningUserEmailEntered)
    var returningUserPasswordEntered = $("#inputPassword1").val();

    // Send the GET request.
    $.ajax('/api/users', {
        type: 'GET'

    }).then(
        function(data) {
            var counterForTotalNumberOfUsers = 0
            counterForTotalNumberOfUsers = data.length;
            console.log(counterForTotalNumberOfUsers)
            for (k = 0; k < data.length; k++) {
                console.log(data[k].user_email)
                if (counterForTotalNumberOfUsers < 1) {
                    $('#smallModalForIncorrectEntry').modal('show')
                    $("#titleForIncorrectEntryModal").append("THERE IS NO ACCOUNT ASSOCIATED WITH THE EMAIL ENTERED - PLEASE LOG-IN AGAIN.")
                    $('#buttonToCloseIncorrectEntryModal').on('click', function(event) {
                        location.reload()
                    })
                } else {
                    if (data[k].user_email === returningUserEmailEntered) {
                        console.log("the email entered matches: " + data[k].user_email)
                        userPasswordInDataBase = data[k].user_pw

                        if (userPasswordInDataBase === returningUserPasswordEntered) {

                            console.log("email and password correct")

                            localStorage.setItem('userIdForCalendarStart', data[k].id);
                            window.location.href = "/calendar"
                            break;
                        } else {
                            $('#smallModalForIncorrectEntry').modal('show')
                            $("#titleForIncorrectEntryModal").append("THE PASSWORD ENTERED DOESN'T MATCH THE EMAIL ENTERED - PLEASE LOG-IN AGAIN.")
                            $('#buttonToCloseIncorrectEntryModal').on('click', function(event) {
                                location.reload()
                            })
                        }
                    } else {
                        counterForTotalNumberOfUsers--
                        console.log(counterForTotalNumberOfUsers)
                    }
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
    console.log(newUser)
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