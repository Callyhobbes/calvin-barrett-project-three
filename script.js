// Welcome user to page and explain quiz to find the best locate to visit in Japan
// based on their preferences.



//Create a scoring sheet for each data-location
let score = {
  tokyo: 0,
  osaka: 0,
  kyoto: 0,
  fukuoka: 0
};

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

// Create a function to all for a parallax scroll on the h1
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

// Create a smooth scroll when anchors and buttons clicked
function smoothScroll() {
  //create an event listener on click on anchors and buttons
  $('a').on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      // cache value
      const MoveTo = this.hash;
      // Using smooth page scroll 
      $('html, body').animate({
        'scrollTop': $(MoveTo).offset().top
      }, 1000, function () {
        // default click behavior
        window.location.hash = MoveTo;
      });
    }
  });
};

// Submit form on final question to get results.
$('form').on('submit', function(event) {
  //prevent browser refresh on submission
  event.preventDefault();
    // Create a function that will tally the values of the radio items selected.
    //select all checked inputs in the field set
  // console.log($('input[value="tokyo"]:checked'));
    let count = $('fieldset').find('input:radio:checked');

    //loop through to get the 3 values and their value
    for (let i =0; i < count.length; i++) {
      let result = count[i].value;

      // Create an if statement for the total score value
      if (result) {
        score[result]++;
        console.log(score);
      }

    }
    
    let topScore = Math.max(score.tokyo, score.osaka, score.fukuoka, score.kyoto);
    console.log(topScore);

  });

// Return the result on the page (what Japanese location you should visit).
// Have the stored array value reset after being displayed.
// Create a button to the top of the page so that the quiz can be restarted.
//Create init function


// Create a function for when the document is ready
$(function() {
  smoothScroll();
  parallaxScroll();
});

