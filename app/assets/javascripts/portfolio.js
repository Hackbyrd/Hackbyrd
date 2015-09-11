$(document).ready(function() {

  // set height to window height and width
  setHeights();
  setWidths();

  // generate random asteroids
  generateAsteroids(30, 300, -($(document).height()/5), -($(document).height()/3));

  // generate background stars
  generateBackgroundStars();

  // on window resize, make background fit screen height
  $(window).resize(function() {
    setHeights();
    setWidths();
    animateSun();
    animateAsteroids();
  });

  // when user scrolls
  $(window).on('scroll', function() {
    switchRocket();
    animateSun();
    animateAsteroids();

    var winWidth = $(window).width();

    // shake rocket in asteroid belt
    if (parseInt($("#asteroid-1").css("right")) >= (winWidth/2) && parseInt($("#asteroid-0").css("right")) < (winWidth/2)) {
      verticalRocket();
      horizontalRocket();
    }

  });

  // particles, original color: #5cbdaa
  $('#particles').particleground({
    dotColor: '#E6E6E6',
    lineColor: '#E6E6E6',
    density: 12000,
    particleRadius: 10,
    curvedLines: false,
    parallax: true,
    parallaxMultiplier: 4
  });

  // scroll to first portfolio
  $(document).on("click", "#see-portfolio", function() {
    scrollToElement("#portfolio-1", 3000);
  });

  // panel click
  $(document).on("click", ".panel-btn", function() {
    var numStr = this.getAttribute('id').substring(this.getAttribute('id').indexOf("-") + 1);

    // scroll to top if at last panel
    if (numStr == "0") {
      scrollToElement("#particles", $(".panel-btn").length * 3000);
    } else {
      scrollToElement("#portfolio-" + numStr, 3000);
    }
  });

});

/***************** Helper Functions *****************/

// set heights
function setHeights () {
  var winHeight = $(window).height();
  $(".window-height").css("height", winHeight);
  $(".window-height-3x").css("height", winHeight * 3);
  $('.intro').css({ 'margin-top': -($('.intro').height() / 2) });
  $("#jcrocket").css("top", (winHeight/2) - (parseInt($("#jcrocket").css("height"))/2));
  $("#jcrocket").css("left", ($(window).width()/2) - (parseInt($("#jcrocket").css("width"))/2));
}

// set width
function setWidths () {
  var winWidth = $(window).width();

  $(".window-width").css("width", winWidth);
  $(".window-width-2").css("width", winWidth/2);
  $(".window-width-3").css("width", winWidth/3);
  $(".window-width-4").css("width", winWidth/4);
}

// scroll to an element
function scrollToElement(target, speed) {
  var destination = jQuery(target).offset().top;
  jQuery( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: destination}, speed, function() {
      window.location.hash = target;
  });
  return false;
}

// switch rockets to simulate flame moving
function switchRocket() {

  // random integer between 0 and 3 inclusive
  var ranInt = Math.floor((Math.random() * 3) + 1);
  var rocketClass = "jcrocket-" + ranInt;

  // change rocket
  $("#jcrocket").attr('class', rocketClass);

}

// vertically move rocket
function verticalRocket() {
  var range = 40; // range the rocket moves up and down
  var ranTop = Math.floor((Math.random() * range) + 1);
  var rocketTop = ($(window).height()/2) - (parseInt($("#jcrocket").css("height"))/2) - (range/2) + ranTop;

  // change height
  $("#jcrocket").css('top', rocketTop);
}

// horizontally move rocket
function horizontalRocket() {
  var range = 40; // range the rocket moves up and down
  var ranLeft = Math.floor((Math.random() * range) + 1);
  var rocketLeft = ($(window).width()/2) - (parseInt($("#jcrocket").css("width"))/2) - (range/2) + ranLeft;

  // change height
  $("#jcrocket").css('left', rocketLeft);
}

// move sun
function animateSun() {

  // calculate percentage of scroll from top
  var percentageScroll = $(window).scrollTop() / ($(document).height() - $(window).height());
  var moveRight = ($(window).width() + (parseInt($("#sun").css("width")) * 2)) * percentageScroll;
  var moveTop = 50 * percentageScroll;

  $("#sun").css("right", -parseInt($("#sun").css("width")) + moveRight);
  $("#sun").css("top", 50 + moveTop);
}

// move asteroids
function animateAsteroids() {
  var percentageScroll = $(window).scrollTop() / ($(document).height() - $(window).height());
  var moveRight = ($(window).width() + (3400 * 2)) * percentageScroll;

  for (var i = 0; i < $(".asteroid").length; i++) {
    $("#asteroid-" + i).css("right", parseInt($("#asteroid-" + i).attr("name"), 10) + moveRight);
  }

}

// generate Asteroids
function generateAsteroids(min_size, max_size, min_right, max_right) {

  // min_right has to be less than -2000
  if (min_right > -2000) {
    min_right = -2000;
  }

  // set the top offset of each asteroid to a random top
  for (var i = 0; i < $(".asteroid").length; i++) {
    var ranSize = Math.floor((Math.random() * (max_size - min_size)) + 1) + min_size; // inbetween the max and min sizes
    var ranTop = Math.floor((Math.random() * $(window).height()) + 1);
    var ranZindex = Math.floor((Math.random() * 2) + 1); // 1 - 2
    var ranRight = Math.floor((Math.random() * (max_right - min_right)) - 1) + min_right;
    var ranRotateSecs = Math.floor((Math.random() * 4) + 1); // 1 - 4

    // set asteroid one to left most rock
    if (i == 1) {
      ranRight = min_right + 1;
    } else if(i == 0) {
      ranRight = max_right - 1;
    }

    // make sure top does not get cut off screen
    if (ranTop <= (ranSize/2)) {
      ranTop = ranTop + (ranSize/2);
    } else if (ranTop >= ($(window).height() - ranSize)) {
      ranTop = ranTop - ranSize;
    }

    // set attributes
    $("#asteroid-" + i).css("top", ranTop);
    $("#asteroid-" + i).css("height", ranSize);
    $("#asteroid-" + i).css("width", ranSize);
    $("#asteroid-" + i).css("right", ranRight);
    $("#asteroid-" + i).attr("name", ranRight + "");

    // set z index randomly
    if (ranZindex == 1) {
      $("#asteroid-" + i).css("z-index", -1);
      $("#asteroid-" + i).addClass("rotating-clockwise-" + ranRotateSecs + "s");

    } else {
      $("#asteroid-" + i).css("z-index", -3);
      $("#asteroid-" + i).addClass("rotating-counter-clockwise-" + ranRotateSecs + "s");
    }

  }

}

// create background stars
function generateBackgroundStars() {
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  var numStars = (winHeight * winWidth)/8000;
  var insertStars = "";

  for (var i = 0; i < numStars; i++) {
    var ranSize = Math.floor((Math.random() * 4)) + 2;
    var ranTop = Math.floor((Math.random() * winHeight)) + 5;
    var ranRight = Math.floor((Math.random() * winWidth)) + 5;

    insertStars = insertStars + "<div class='background-star' style='height:" + ranSize + "px; width:" + ranSize + "px; top: " + ranTop + "px; right: " + ranRight + "px;'></div>";
  }

  $(insertStars).insertAfter("#star-1");
}
