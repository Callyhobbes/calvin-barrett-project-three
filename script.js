// Welcome user to page and explain quiz to find the best locate to visit in Japan
// based on their preferences.



//Create a scoring sheet for each data-location
let scores = [
  { cityName: 'tokyo', score: 0 },
  { cityName: 'osaka', score: 0 },
  { cityName: 'kyoto', score: 0 },
  { cityName: 'fukuoka', score: 0 }
];

//Create an object of different results that the user will receive
const cities = [
  {
    name: 'tokyo',
    info: 'The bustling sound of people, trains darting back and forth and towers reaching to the sky. Tokyo is filled with everything from the world famous Tsukiji fish market, the Meiji Shrine and the anime enthuists dream: Akihabara',
    image: './assets/rising-sun.png',
  },
  {
    name: 'osaka',
    info: 'insert text here',
    image: './assets/rising-sun.png',
  },
  {
    name: 'kyoto',
    info: 'insert text here',
    image: './assets/rising-sun.png',
  },
  {
    name: 'fukuoka',
    info: 'insert text here',
    image: './assets/rising-sun.png',
  }
];

// Create a function to all for a parallax scroll on the h1.
function parallaxScroll() {
  //add an event listener to the scroll
  $(window).on('scroll', function () {
    //target the h1 as the parallax item
    const parallaxText = $('.header-text');

    let scrolled = $(window).scrollTop();
    let rate = scrolled * -0.5;
    //have the h1 move up faster than the background image
    parallaxText.css('transform', 'translate3d(0px,' + rate + 'px, 0px)');
  });
};

// Create a smooth scroll when anchors and buttons clicked.
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
  
  //smooth scroll to the results section
  $(`html,body`).animate({
    scrollTop: $('.results').offset().top
  }, 1000);

  // map through the scores array to update points on it
  const updateScore = scores.map(function(city) {
    // using the checked selector to get total points for each city 
    const cityScores = $(`input[value=${city.cityName}]:checked`).length;
    // return the object with updated score
    return { cityName: city.cityName, score: cityScores }
  });

  // setting up current score, and a result array
  let currentHighScore = 0;
  let result = [];

  // loop though array of scores
  for (let i = 0; i < updateScore.length; i++) {
    // if the current iteration of score is HIGHEST than the leader board:
    // if (updateScore[i])
    if (updateScore[i].score > currentHighScore) {
      // Update result arr to this current object
      result = [updateScore[i]];
      // Update the leader board
      currentHighScore = updateScore[i].score;
    }
  }

  for (let loc in cities) {
    // console.log(cities[loc].name);
    const winningCity = result[0].cityName;
    const displayInformation = cities[loc];

    if (displayInformation.name === winningCity) {
      const htmlToAppend = `
        <div class="result-display wrapper">
          <div class="explanation">
            <h3>You got <span>${displayInformation.name}<span>!</h3>
            <p>${displayInformation.info}</p>
          </div>
          <img src="${displayInformation.image}" alt="${displayInformation.name}">
        </div>
        <div class="redo-quiz blue-bg">
          <a href="#intro" class"redo">Want to try again?</a>
        </div>
      `
      $('.results').html(htmlToAppend);
    }
  }
  $('footer').toggleClass('footer-main footer-flip');
});

// Retake the test.
$('.results').on('click', 'a', function() {
  // empty the results
  $('.results').empty();
  // clear the form's checked inputs
  $('form').trigger('reset');
  // smooth scroll
  $(`html,body`).animate({
    scrollTop: $('#intro').offset().top
  }, 1000);
  $('footer').toggleClass('footer-main footer-flip');
});

// Create a function for when the document is ready
$(function() {
  smoothScroll();
  parallaxScroll();
});
