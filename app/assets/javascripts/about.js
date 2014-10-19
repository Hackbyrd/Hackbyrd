$(document).ready(function() {

  // on page load resize background to fit screen height
  setBackground();

  // on window resize, make background fit screen height
  $(window).resize(function() {
    setBackground();
  });

  // set diagonal position
  $("#about-content-diagonal").css("left", $(window).width()/2);

  // scroll position
  var $last_scroll_position = 0;

  // parallax effect on scrol for background
  $(window).scroll(function() {
    var backgroundPos = $("#about-background").css("backgroundPosition").split(" ");
    var xPos = backgroundPos[0];
    var yPos = $(window).scrollTop() * .5;
    $("#about-background").css("backgroundPosition", xPos + " " + yPos + "px");

    // move the diagonal div when scroll gets
    $("#about-content-diagonal").css("left", $(window).width()/2 - ($(this).scrollTop() * tanDeg(15)));

  });

});

// set the background of the about div cover photo
function setBackground () {
  $("#about-background").css("height", $(window).height());
}

function tanDeg(o) {
  var e = o * Math.PI / 180;
  return Math.tan(e)
}
