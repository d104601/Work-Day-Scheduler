// function to get current date
function getCurrentDay() 
{
    var dateBox = $("#currentDay");
    dateBox.text(moment().format('dddd MMMM Do YYYY'));
}

// function to render time table
function getTimeTable() 
{
    var container = $(".container");

    var curr;
    for(let i = 9; i < 18; i++) 
    {
        // creating row box
        var time = $("<div>");
        time.attr("class", "row hour");

        // appending hour box
        if(i < 13)
        {
            time.append('<div class="time-block col-md-1">' + i + 'AM</div>');
        }
        else
        {
            time.append('<div class="time-block col-md-1">' + (i - 12) + 'PM</div>');
        }
        
        // rendering and appending text box
        var textBox = $("<textarea>");
        textBox.attr("id", i);
        textBox.attr("class", "description col-md-10 future");
        getSavedSchedule(textBox, i);
        time.append(textBox);

        // appending button
        var button = $("<button>");
        button.attr("class", "btn saveBtn col-md-1");
        var buttonId = "#button" + i;
        button.attr("id", buttonId);
        button.text("Save");

        time.append(button);
        container.append(time);
    }
}

// function to get saved text from local storage
function getSavedSchedule(textBox, key) {
    textBox.text(localStorage.getItem(key));
}


// function to give background color to text area as current time
function getColor()
{
    var currTime = parseInt(moment().format('HH'));
    if(currTime > 17)
    {
        currTime = 18;
    }

    for(let i = 9; i < currTime; i++)
    {
        var currText = $("#" + i);
        currText.removeClass("future");
        currText.addClass("past");
    }
    $("#" + currTime).removeClass("future");
    $("#" + currTime).addClass("present");
}

getCurrentDay();
getTimeTable();
getColor();

$(document).ready(function () {
    $(".saveBtn").on("click", function () {
    // Get nearby values of the description in JQuery
        var text = $(this).siblings(".description").val();
        var time = $(this).siblings(".description").attr("id");

        // Save text in local storage
        localStorage.setItem(time, text);
            }
        )
    }
);