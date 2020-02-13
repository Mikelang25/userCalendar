var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


$(document).ready(function () {

    $.get("/api/tasks", function (data) {
        console.log(data)
        var tasks = data;
        console.log('testing:', tasks[1]);
        for (var i = 0; i < days.length; i++) {
            let j = 5;

            do {
                for (var l = 0; l <= tasks.length-1; l++) {
                    console.log(l+ "l");
                    console.log(j+ "j");
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

                        console.log("this works");
                        var newTask = $("<p>").text(tasks[l].task_name)
                        var taskComment = $("<p>").text(startTime + endTime);
                        newTask.append(taskComment);
                        var taskLength = Math.abs(parseInt(tasks[l].task_stime) - parseInt(tasks[l].task_etime));
                        $("#" + days[i]).append(newTask)
                        newTask.addClass("task-" + taskLength);
                        newTask.attr("id", l)
                        newTask.addClass("active-task");
                        j += taskLength
                    }
                }


                var newHour;
                if (j < 12) {
                    newHour = $("<p>").text(j + ":00 am").addClass("single-hour")
                } else if (j === 12) {
                    newHour = $("<p>").text(j + ":00 pm").addClass("single-hour")
                } else {
                    newHour = $("<p>").text(j - 12 + ":00 pm").addClass("single-hour")
                }
                newHour.attr("id", days[i] + "-" + newHour)
                $("#" + days[i]).append(newHour)
                j++
            }
            while (j < 24);

        }
    });

    $(".active-task").on("click", function (event) {
        console.log("this works")
        var selectTask = $(this).attr("id")

        $("#taskDay").val(tasks[selectTask].taskDay);
        $("#taskName").val(tasks[selectTask].taskName);
        $("#taskDesc").val(tasks[selectTask].comment);

        $("#selectTaskModal").modal("toggle")
    });

});