// Welcome user to page and explain quiz to find the best locate to visit in Japan
// based on their preferences.
// Submit form form to get results.
// Create a function that will tally the values of the radio items selected.
// Create an if statement for the total score value and return the result on the page (what Japanese location you should visit).
// Have the stored array value reset after being displayed.
// Create a button to the top of the page so that the quiz can be restarted.

// Create an array to store selected items(radio item scored 1 - 4 on html).
let userChoices = [];

//Create an object of different results that the user will receive
const cities = {
  tokyo: {
    name: 'Tokyo',
    info: 'insert text here',
    image: '',
  },
  osaka: {
    name: 'Osaka',
    info: 'insert text here',
    image: '',
  },
  kyoto: {
    name: 'Kyoto',
    info: 'insert text here',
    image: '',
  },
  fukuoka: {
    name: 'Fukuoka',
    info: 'insert text here',
    image: '',
  }
};

//Create a smooth scroll when anchors and buttons clicked
function smoothScroll() {

  //create an event listener on click on anchors and buttons
  $('a, button').on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // cache value
      const MoveTo = this.hash;

      // Using smooth page scroll 
      $('html, body').animate({
        scrollTop: $(MoveTo).offset().top
      }, 1000, function () {

        // default click behavior
        window.location.hash = MoveTo;
      });
    }
  });
};

$(function() {
  smoothScroll();
});

