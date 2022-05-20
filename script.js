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
    for(let i = 0; i < 9; i++) 
    {
        curr = i + 9;
        var time = $("<div>");
        time.attr("class", "row hour");

        // appending hour box
        if(curr < 13)
        {
            time.append('<div class="time-block col-md-1">' + curr + 'AM</div>');
        }
        else
        {
            time.append('<div class="time-block col-md-1">' + (curr - 12) + 'PM</div>');
        }
        
        // rendering and appending text box
        var textBox = $("<textarea>");
        textBox.attr("id", curr);
        textBox.attr("class", "col-md-10 future");
        getSavedSchedule(textBox, curr);
        time.append(textBox);

        // appending button
        var button = $("<button>");
        button.attr("class", "saveBtn col-md-1");
        button.text("Save");
        button.click(saveButton(curr, textBox));
        time.append(button);
        container.append(time);
    }
}

// function to get saved text from local storage
function getSavedSchedule(textBox, key) {
    textBox.text(localStorage.getItem(key));

}

// function to save contents in textarea to local storage as clicking save button
function saveButton(key, textBox){
    localStorage.setItem(key, textBox.text);
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
        currText.attr("class", "col-md-10 past");
    }
    $("#" + currTime).attr("class", "col-md-10 present");
}

getCurrentDay();
getTimeTable();
getColor();
