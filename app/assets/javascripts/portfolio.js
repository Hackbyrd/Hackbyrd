$(document).ready(function() {

  // set height to window height
  setHeights();

  // set the top offset of each asteroid
  positionAsteroids();

  // generate background stars
  generateBackgroundStars();

  // on window resize, make background fit screen height
  $(window).resize(function() {
    setHeights();
    animateSun();
    animateAsteroids();
  });

  // when user scrolls
  $(window).scroll(function(){
    switchRocket();
    animateSun();
    animateAsteroids();

    // shake rocket in asteroid belt
    if (parseInt($("#asteroid-1").css("right")) >= ($(window).width()/2) && parseInt($("#asteroid-0").css("right")) < ($(window).width()/2)) {
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
  $(document).on("click", "#see-portfolio", function(){
    scrollToElement("#portfolio-1");
  });

});

/***************** Helper Functions *****************/

// set heights
function setHeights () {
  $(".window-height").css("height", $(window).height());
  $('.intro').css({ 'margin-top': -($('.intro').height() / 2) });
  $("#jcrocket").css("top", ($(window).height()/2) - (parseInt($("#jcrocket").css("height"))/2));
  $("#jcrocket").css("left", ($(window).width()/2) - (parseInt($("#jcrocket").css("width"))/2));
}

// scroll to an element
function scrollToElement(target) {
  var speed = 1000;
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

// set the top offset of asteroids
function positionAsteroids() {

  // set the top offset of each asteroid to a random top
  for (var i = 0; i < $(".asteroid").length; i++) {
    var ranTop = Math.floor((Math.random() * $(window).height() - parseInt($("#asteroid-" + i).css("height"), 10)) + 1);
    $("#asteroid-" + i).css("top", ranTop);
  }
}

// create background stars
function generateBackgroundStars() {
  var numStars = ($(window).height() * $(window).width())/10000;
  var insertStars = "";

  for (var i = 0; i < numStars; i++) {
    var ranSize = Math.floor((Math.random() * 4)) + 2;
    var ranTop = Math.floor((Math.random() * $(window).height())) + 5;
    var ranRight = Math.floor((Math.random() * $(window).width())) + 5;

    insertStars = insertStars + "<div class='background-star' style='height:" + ranSize + "px; width:" + ranSize + "px; top: " + ranTop + "px; right: " + ranRight + "px;'></div>";
  }

  $(insertStars).insertAfter("#star-1");
}
