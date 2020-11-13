// Welcome user to page and explain quiz to find the best locate to visit in Japan
// based on their preferences.



//Create a scoring sheet for each data-location
let score = {
  tokyo: 0,
  osaka: 0,
  kyoto: 0,
  fukuoka: 0
}

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

//Create a function to all for a parallax scroll on the h1
function parallaxScroll() {
  //add an event listener to the scroll
  $(window).on('scroll', function () {
    //target the h1 as the parallax item
    const parallaxText = $('.header-text');

    let scrolled = window.pageYOffset;
    let rate = scrolled * -0.5;
    //have the h1 move up faster than the background image
    parallaxText.css('transform', 'translate3d(0px,' + rate + 'px, 0px)');
  });
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


  $('fieldset').on('submit', function(event) {
    // console.log('hello');
    //prevent browser refresh on submission
    event.preventDefault();

    let count = $(this).forEach('input:radio:checked').attr('data-location');
    
    console.log(count);
  });

// Submit form form to get results.
// Create a function that will tally the values of the radio items selected.
// Create an if statement for the total score value and return the result on the page (what Japanese location you should visit).
// Have the stored array value reset after being displayed.
// Create a button to the top of the page so that the quiz can be restarted.
//Create init function

$(function() {
  smoothScroll();
  parallaxScroll();
});

