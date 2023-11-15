
$(function () {
  //Variable to retrieve the current out using dayjs
  var currentHour = dayjs().hour() 
  //Variable to retrieve the current day
  var today = dayjs()
  //Using jQuery, grabs the element with class currentDay and adds the text of the current day in the given format
  $('#currentDay').text(today.format('dddd, MMMM D YYYY')) 

  var saveItem = function (hourDiv) {
    hourID = (hourDiv.getAttribute("id"))
    textArea = document.getElementById(hourID + '-text')
    localStorage.setItem(hourID, textArea.value)
    console.log(textArea.value)
    console.log('saved')
  }

  var displayItems = function () {

      //Iterates for the hours of 9 - 5, 9 total times. 
      for(let i = 0; i < 9; i++)
      {
        //Since 12 % 12 = 0 and we want to display 12pm we hardcode this value
        if(i === 3)
        {
          localHour = 12
        }
        //Sets the first hours to 9, 10, 11, and then 1, 2 .. thanks to the modelo function
        else
        {
          localHour = ((i + 9) % 12)
        }

        //Creates the div and adds the appropriate data class/id
        itemDiv = $('<div>')

        //We need our id in format 'hour-9' to retrieve later
        itemDiv.attr("id", "hour-" + localHour)
        itemDiv.addClass("row time-block")

        //We create another variable so that 1, 2, 3... pm show AFTER the am hours and can calculate correctly
        //based on the current hour
        localHour2 = (i + 9) 
        
        //Based on the new varible and its relation to the current hour, changes the color based on class
        if(localHour2 < currentHour)
        {
          itemDiv.addClass("past")

        }
        else if (localHour2 === currentHour)
        {
          itemDiv.addClass("present")
        }
        else{
          itemDiv.addClass("future")
        }

        hourDiv = $('<div>')

        //Adds the text AM and PM respectively
        if(localHour >= 9 && localHour != 12)
        {
          hourDiv.text(localHour + "AM")
        }
        else{
          hourDiv.text(localHour + "PM")
        }
        hourDiv.addClass("col-2 col-md-1 hour text-center py-3")

        //Creates the text hour and adds the necessary id
        textArea = $('<textarea>')
        textArea.addClass("col-8 col-md-10 description")
        textArea.attr("rows", "3")
        textArea.attr("id", "hour-" + localHour + "-text" )

        //Adds the text from local storage to the item
        text = localStorage.getItem('hour-' + localHour)
        textArea.text(text)

        //Creates the save button and adds the necessary class/attributes. Creates click function
        saveButton = $('<button>')
        saveButton.addClass("btn saveBtn col-2 col-md-1")
        saveButton.attr("aria-label", "save")
        saveButton.on('click', function(){saveItem(this.parentElement)})

        //displays the appropriate image
        image = $('<i>')
        image.addClass("fas fa-save")
        image.attr("aria-hidden", "true")

        //appends the div to the container
        saveButton.append(image)
        itemDiv.append(hourDiv,textArea,saveButton)
        $('#container').append(itemDiv)
      }
  }

displayItems()
});
