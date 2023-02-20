$(function () {
  var saveBtn = $(".saveBtn");
  var saveHourID;

  //Add event listener for click to selecte the parent nod id of the save button that's been clicked
  saveBtn.on("click", function (event) {
    event.preventDefault();
    var saveHourElChild = $(this);
    saveHourID = saveHourElChild.parent().attr("id");
    saveData(); //call function to save user input
  });

  //Use dayjs to find current hour
  var today = dayjs();
  currentHour = today.hour();

  //pull hour container element from html using jQuery
  hourContainer = $(".container-fluid").children();

  //for loop to loop through children of the hour container for styling
  for (i = 0; i < hourContainer.length - 3; i++) {
    var hourAtHand = hourContainer.eq(i);
    //converts number part of id from string to number value
    hourNum = parseInt(hourAtHand.attr("id").substring(5, 7));

    //compare each child id  to the current hour and apply proper styling class
    if (hourNum < currentHour) {
      hourContainer.eq(i).addClass("past");
    } else if (hourNum > currentHour) {
      hourContainer.eq(i).addClass("future");
    } else {
      hourContainer.eq(i).addClass("present");
    }
  }

  //loop searching for data for each hour ID in localStorage
  for (i = 0; i < hourContainer.length - 3; i++) {
    var hourAtHand = hourContainer.eq(i);
    hourID = hourAtHand.attr("id");
    hourText = localStorage.getItem(hourID);

    //conditional to check if data exists, and if it does it will be inserted into the proper text box
    if (hourText !== null) {
      hourTextEl = hourAtHand.children().eq(1);
      hourAtHand.children().eq(1).val(hourText);
    }
  }
  //function to save user input data into local storage
  function saveData() {
    var saveTextArea = $("#" + saveHourID)
      .children()
      .eq(1);
    var userInput = saveTextArea.val();
    localStorage.setItem(saveHourID, userInput);
  }
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(today.format("dddd, MMMM D"));
});
