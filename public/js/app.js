
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']


$(document).ready(function () {
  var userIdForCalendarStartFromLocalStorage = localStorage.getItem('userIdForCalendarStart')
  var userIdForCalendarStartFromLocalStorage = 7;
  console.log(userIdForCalendarStartFromLocalStorage)
  $.get("/api/tasks/"+userIdForCalendarStartFromLocalStorage, function (data) {
    var tasks = data;
    for (var i = 0; i < days.length; i++) {
      let j = 5;

      do {
        for (var l = 0; l <= tasks.length - 1; l++) {
          if (j === tasks[l].task_stime && days[i] === tasks[l].task_day) {

            var startTime;
            var endTime;
            if (parseInt(tasks[l].task_stime) > 12) {
              startTime = parseInt(tasks[l].task_stime) - 12 + ":00 pm - "
            } else if (tasks[l].task_stime === 12) {
              startTime = parseInt(tasks[l].task_stime) + ":00 pm - "
            } else {
              startTime = parseInt(tasks[l].task_stime) + ":00 am - "
            }

            if (parseInt(tasks[l].task_etime) > 12) {
              endTime = parseInt(tasks[l].task_etime) - 12 + ":00 pm"
            } else if (tasks[l].task_etime === 12) {
              endTime = parseInt(tasks[l].task_etime) + ":00 pm"
            } else {
              endTime = parseInt(tasks[l].task_etime) + ":00 am"
            }
            var newTask = $("<p>").text(tasks[l].task_name)
            var taskComment = $("<p>").text(startTime + endTime);
            newTask.append(taskComment);
            var taskLength = Math.abs(parseInt(tasks[l].task_stime) - parseInt(tasks[l].task_etime));
            $("#" + days[i]).append(newTask)
            newTask.addClass("task-" + taskLength);
            newTask.attr("id", tasks[l].id)
            newTask.attr("task_name", tasks[l].task_name)
            newTask.attr("task_stime", tasks[l].task_stime)
            newTask.attr("task_etime", tasks[l].task_etime)
            newTask.attr("task_day", tasks[l].task_day)
            newTask.attr("task_comment", tasks[l].task_comment)
            newTask.addClass("active-task");
            j += taskLength
          }
        }

        var newHour
        if (j < 12) {
          newHour = $('<p>').text(j + ':00 am').addClass('single-hour')
        } else if (j === 12) {
          newHour = $('<p>').text(j + ':00 pm').addClass('single-hour')
        } else {
          newHour = $('<p>').text(j - 12 + ':00 pm').addClass('single-hour')
        }
        newHour.attr('id', days[i] + '-' + newHour)
        $('#' + days[i]).append(newHour)
        j++
      }
      while (j < 24)
    }
  });

  $(document).on("click", ".active-task", function () {
    console.log('this works')
    var selectTask = $(this).attr('id')

    $('#taskDay').val($(this).attr('task_day'))
    $('#taskName').val($(this).attr('task_name'))
    $('#taskDesc').val($(this).attr('task_comment'))
    $('#taskID').val($(this).attr('id'))
    $('#selectTaskModal').modal('toggle')
  });

  // update a specific task 
  $(document).on("click", "#update-task", function () {

    var taskDay = $('#taskDay').val();
    var taskName = $('#taskName').val();
    var taskDescr = $('#taskDesc').val();
    var taskID =  $('#taskID').val();

    var updatedTask = {
      task_day: taskDay,
      task_name: taskName,
      task_comment: taskDescr,
      id: taskID
    };

    $.ajax("/api/tasks/" + taskID, {
      type: "PUT",
      data: updatedTask
    }).then(
      function () {
        console.log("Your task has been updated");
        location.reload();
      }
    );
  });


  // delete a specific task
  $(document).on("click", "#delete-task", function () {

    var taskID =  $('#taskID').val();

    $.ajax("/api/tasks/" + taskID, {
      type: "DELETE",

    }).then(
      function () {
        console.log("Your task has been deleted");
        location.reload();
      }
    );
  });

  // delete all tasks for a specific user
  $(document).on("click", "#delete-all", function () {

    var taskID =  $('#taskID').val();

    $.ajax("/api/tasks/deleteall/" + userIdForCalendarStartFromLocalStorage, {
      type: "DELETE",

    }).then(
      function () {
        console.log("Your calendar has been cleared");
        location.reload();
      }
    );
  });

});
