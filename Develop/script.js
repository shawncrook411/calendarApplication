
$(function () {
  currentHour = dayjs().hour()

  var saveItem = function (hourDiv) {
    hourID = (hourDiv.getAttribute("id"))
    textArea = document.getElementById(hourID + "-text")
    localStorage.setItem(hourID, textArea.value)
  }


  $('.saveBtn').on('click', function(){saveItem(this.parentElement)})
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  var displayItems = function () {

      for(let i = 0; i < 9; i++)
      {
        if(i === 3)
        {
          localHour = 12
        }
        else
        {
          localHour = ((i + 9) % 12)
        }

        itemDiv = $('<div>')
        itemDiv.attr("id", "hour-" + localHour)
        itemDiv.addClass("row time-block")

        localHour2 = (i + 9) 
        
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
        if(localHour >= 9 && localHour != 12)
        {
          hourDiv.text(localHour + "AM")
        }
        else{
          hourDiv.text(localHour + "PM")
        }
        hourDiv.addClass("col-2 col-md-1 hour text-center py-3")

        textArea = $('<textarea>')
        textArea.addClass("col-8 col-md-10 description")
        textArea.attr("rows", "3")
        
        saveButton = $('<button>')
        saveButton.addClass("btn saveBtn col-2 col-md-1")
        saveButton.attr("aria-label", "save")

        image = $('<i>')
        image.addClass("fas fa-save")
        image.attr("aria-hidden", "true")

        saveButton.append(image)
        itemDiv.append(hourDiv,textArea,saveButton)
        $('#container').append(itemDiv)
      }


  }


  var today = dayjs()
  $('#currentDay').text(today.format('dddd, MMMM D YYYY'))

displayItems()
});
