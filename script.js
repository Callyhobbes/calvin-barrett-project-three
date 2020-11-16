//Create a scoring sheet for each location
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
    info: `The bustling sound of people, trains darting back and forth and towers reaching to the sky. Tokyo is filled with everything from the world famous <a href="https://www.tsukiji.or.jp/english/" target="_blank" class="location-links">Tsukiji</a> fish market, the <a href="https://www.gotokyo.org/en/spot/76/index.html" target="_blank" class="location-links">Meiji</a> Shrine and the anime enthuists dream, <a href="https://en.wikipedia.org/wiki/Akihabara" target="_blank" class="location-links">Akihabara</a>. The world is your osyter in Tokyo!`,
    image: './assets/tokyo.jpg',
  },
  {
    name: 'osaka',
    info: `<p>A city filled with deep fried goodies like <a href="https://www.justonecookbook.com/takoyaki-recipe/" target="_blank" class="location-links">Takoyaki</a> and <a href="https://www.justonecookbook.com/kushikatsu-kushiage/" target="_blank" class="location-links">Kushikatsu</a> and populated by lively and eccentric personalities. Osaka hosts one of the world's best aquariums at <a href= "https://www.kaiyukan.com/language/eng/" target="_blank" class="location-links" >Kaiyukan</a>. Osakan's sport a thick <a href="https://osaka-info.jp/en/page/osaka-dialect" target="_blank" class="location-links">accent</a>, so remember to say thank you with an "okini" and a big smile!</p>`,
    image: './assets/osaka.jpg',
  },
  {
    name: 'kyoto',
    info: `<p>Steeped in history, Kyoto is the former capital of Japan. This city is filled with history whether it be the <a href="https://www.japan-guide.com/e/e3908.html" target="_blank" class="location-links">Kinkakuji</a> Temple and the traditional streets of <a href="https://www.japan-guide.com/e/e3902.html" target="_blank" class="location-links">Gion</a>, you are sure to find something you'll like. You might even catch a glimpse of a<a href = "https://www.japan-guide.com/e/e2102.html" target = "_blank" class= "location-links" > Geisha</a> roaming the streets</p >`,
    image: './assets/kyoto.jpg',
  },
  {
    name: 'fukuoka',
    info: `<p>Looking for a more local experience? Fukuoka is the place for you! This city has some of the best <a href="https://www.ippudo.com/" target="_blank" class="location-links">ramen</a> in all of the world. Need a break? Why not visit some hot <a href="https://www.japan-guide.com/e/e4701.html" target="_blank" class="location-links">springs</a> close by or marvel in the spectacular <a href="https://uminaka-park.jp/en/" target="_blank" class="location-links">parks</a> and mountains of the area.</p>`,
    image: './assets/fukuoka.jpg',
  }
];

// Time-out for preload of plane landing icon
setTimeout(function () {
  $('.preload').fadeToggle();
}, 2500);

// Create the ability to change the h1 text to English on hover
function changeText() {
  $('h1').hover(
    // Mouse enter, change text to English
    function () {
      $('h1').fadeOut(function () {
        $(this).text('Welcome to Japan').fadeIn(800);
      });
    }, 
    // Mouse exit, change text to Japanese
    function () {
      $('h1').fadeOut(function () {
        $(this).text('日本へようこそ').fadeIn(800);
      });
    });
};

// Create a function to all for a parallax scroll on the h1.
function parallaxScroll() {
  //add an event listener to the scroll
  $(window).on('scroll', function () {
    //target the h1 as the parallax item
    const parallaxText = $('h1');

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
function tallyResults() {
  $('form').on('submit', function (event) {
    //prevent browser refresh on submission
    event.preventDefault();

    //smooth scroll to the results section
    $(`html,body`).animate({
      scrollTop: $('.results').offset().top
    }, 1000);

    // map through the scores array to update points on it
    const updateScore = scores.map(function (city) {
      // using the checked selector to get total points for each city 
      const cityScores = $(`input[value=${city.cityName}]:checked`).length;
      // return the object with updated score
      return { cityName: city.cityName, score: cityScores };
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
      // if matching, add selected city to the result section
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
      `;
        $('.results').html(htmlToAppend);
      }
    }
    // toggle footer from dark blue to red when results displayed
    $('footer').toggleClass('footer-main footer-flip');
  });
};

// Retake the test.
function retakeTest() {
  $('.results').on('click', 'a', function () {
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
}

// Create a function for when the document is ready
$(function() {
  changeText();
  smoothScroll();
  parallaxScroll();
  tallyResults();
  retakeTest();
});

