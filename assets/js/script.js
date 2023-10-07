
$(function () {
  var currentHour = dayjs().hour() 
  var today = dayjs()
  $('#currentDay').text(today.format('dddd, MMMM D YYYY')) 

  var saveItem = function (hourDiv) {
    hourID = (hourDiv.getAttribute("id"))
    textArea = document.getElementById(hourID + '-text')
    localStorage.setItem(hourID, textArea.value)
    console.log(textArea.value)
    console.log('saved')
  }

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
        textArea.attr("id", "hour-" + localHour + "-text" )
        text = localStorage.getItem('hour-' + localHour)
        textArea.text(text)

        saveButton = $('<button>')
        saveButton.addClass("btn saveBtn col-2 col-md-1")
        saveButton.attr("aria-label", "save")
        saveButton.on('click', function(){saveItem(this.parentElement)})

        image = $('<i>')
        image.addClass("fas fa-save")
        image.attr("aria-hidden", "true")

        saveButton.append(image)
        itemDiv.append(hourDiv,textArea,saveButton)
        $('#container').append(itemDiv)
      }
  }

displayItems()
});
