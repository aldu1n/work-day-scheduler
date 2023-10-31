// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  
// Variable to store current date, then its written into header.
var currentDay = dayjs().format('dddd, MMMM D');
$("#currentDay").text(currentDay);

// Variable to store current hour.
var currentHour = dayjs().hour();

// Function to change time-block class for past, present and future depending on current time.
$('.time-block').each(function() {

  var hour = $(this).data('hour');
  
  if (currentHour < hour) {
    $(this).addClass('future');
  } 
  else if (currentHour === hour) {
    $(this).addClass('present');
  } 
  else {
    $(this).addClass('past');
  }
});



// Event listener for click events on the save button. 
$('.saveBtn').on('click', function () {

// Adds 'event saved to the local storage' when save button is clicked.
  var savedEl = $('<p>');
  $('#success').append(savedEl);
  savedEl.text('Event saved to the Local Storage✅');

// Timer to remove the text after 1 second.
  var successTime = 1;
  var timer = setInterval(function() {
  successTime--;
  if(successTime === 0) {
    savedEl.remove();
  }
  }, 1000);
  setInterval(timer)

  // Variale to get specific time-block, and textarea of each save button.
  var timeBlock = $(this).closest('.time-block');
  var textarea = timeBlock.find('.description');

  // Variable to get textarea value.
  var inputValue = textarea.val();

 // Gets data-hour dataset to use as a key for local storage.
  var hour = timeBlock.data('hour');

  // Saves the input value to local storage.
  localStorage.setItem('hour-' + hour, inputValue);
  });

 //Function to get the data from the local storage
  $('.time-block').each(function () {
    var timeBlock = $(this);
    var hour = timeBlock.data('hour');
    var savedValue = localStorage.getItem('hour-' + hour);
  // If textarea input is not empty, get the local storage value and display it on the page.
    if (savedValue !== null) {
      timeBlock.find('.description').val(savedValue);
    }
});
});
