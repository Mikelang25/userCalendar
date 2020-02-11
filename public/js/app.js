var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

var tasks = [
{
    taskName: "Movies",
    taskDay:"monday",
    taskStart: 11,
    taskEnd:12,
    comment:"Seeing 300 with Karen" 
},
{
    taskName:"Bowling",
    taskDay:"monday",
    taskStart:13,
    taskEnd: 16,
    comment:"With Carey and Frank"
},
{
    taskName:"Gym",
    taskDay:"friday",
    taskStart:6,
    taskEnd: 8,
    comment:"Back day"
},
{
    taskName:"Parent Teacher Conference",
    taskDay:"wednesday",
    taskStart:8,
    taskEnd: 12,
    comment:"Kid Got Fs" 
},
{
    taskName:"Dinner with wife",
    taskDay:"thursday",
    taskStart:16,
    taskEnd: 18,
    comment:"Del Friscos" 
}
];

$(document).ready(function() {


for(var i = 0; i < days.length;i++){
    var j = 5;
    do{
        for(var k = 0;k<tasks.length;k++){
            var taskStart = parseInt(tasks[k].taskStart)
            if(j===taskStart && days[i] === tasks[k].taskDay){
                var startTime;
                var endTime;
                if(parseInt(tasks[k].taskStart)>12){
                    startTime = parseInt(tasks[k].taskStart)-12 + ":00 pm - "
                }else if (tasks[k].taskStart===12){
                    startTime = parseInt(tasks[k].taskStart) + ":00 pm - "
                }else{
                    startTime = parseInt(tasks[k].taskStart) + ":00 am - "
                }

                if(parseInt(tasks[k].taskEnd)>12){
                    endTime = parseInt(tasks[k].taskEnd)-12 + ":00 pm"
                }else if (tasks[k].taskEnd===12){
                    endTime = parseInt(tasks[k].taskEnd) + ":00 pm"
                }else{
                    endTime = parseInt(tasks[k].taskEnd) + ":00 am"
                }


                var newTask = $("<p>").text(tasks[k].taskName)
                var taskComment = $("<p>").text(startTime + endTime);
                newTask.append(taskComment);
                var taskLength = Math.abs(parseInt(tasks[k].taskStart) - parseInt(tasks[k].taskEnd));
                $("#" + days[i]).append(newTask)
                newTask.addClass("task-" + taskLength);
                newTask.attr("id",k)
                newTask.addClass("active-task");
                j +=taskLength
            }
        }  
        var newHour; 
        if(j<12){
            newHour = $("<p>").text(j + ":00 am").addClass("single-hour")
        }else if (j===12){
            newHour = $("<p>").text(j +":00 pm").addClass("single-hour")    
        }else{  
            newHour = $("<p>").text(j-12 +":00 pm").addClass("single-hour")
        }
        newHour.attr("id",days[i] + "-" + newHour)
        $("#" + days[i]).append(newHour)
        j++
    }
    while(j<24);
    
}

$(".active-task").on("click", function (event) {
    console.log("this works")
    var selectTask = $(this).attr("id")

    $("#taskDay").val(tasks[selectTask].taskDay);
    $("#taskName").val(tasks[selectTask].taskName);
    $("#taskDesc").val(tasks[selectTask].comment);

    $("#selectTaskModal").modal("toggle")
});

});