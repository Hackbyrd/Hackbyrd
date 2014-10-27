$(document).ready(function() {

  // prevent side scrolling for mouse
  $(window).bind('mousewheel', function(e) {
    if(e.originalEvent.wheelDeltaX != 0) {
        e.preventDefault();
    }
  });

  // prevent side scrolling with arrow keys
  $(document).keydown(function(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
      e.preventDefault();
    }
  });

  // on page load resize background to fit screen height
  setBackground();

  // set diagonal position right
  setDiagonalPosition();

  // set social links position
  setSocialLinksPosition();

  // on window resize, make background fit screen height, and diagonal position correct
  $(window).resize(function() {
    setBackground();
    setDiagonalPosition();
    setSocialLinksPosition();
  });

  // scroll position
  var $last_scroll_position = 0;

  // parallax effect on scroll for background as well as moving diagonal sideways
  $(window).scroll(function(e) {

    // parallax effect on background image
    var backgroundPos = $("#about-background-right").css("backgroundPosition").split(" ");
    var xPos = backgroundPos[0];
    var yPos = $(window).scrollTop() * .5;
    $("#about-background-right").css("backgroundPosition", xPos + " " + yPos + "px");

    // move the diagonal div when scroll gets
    setDiagonalPosition();

    // set social links position
    setSocialLinksPosition();

  });

  // more about me button takes user to diagonal scroll section
  $("#learnmore-btn").click(function() {
    scrollToElement("#about-content-container");
  });

});

// set the background of the about div cover photo
function setBackground () {

  // set height of background cover
  $(".background-height").css("height", $(window).height());

  // jc quote placement
  if($(window).height() > 600) {
    $("#jc-quote").css("display", "block");
    $("#jc-quote").css("fontSize", "1.5em");
    $("#jc-quote").css("marginBottom", "60px");
    $("#learnmore-box").css("top", $(window).height() * .4);
  } else if($(window).height() > 540) {
    $("#jc-quote").css("display", "block");
    $("#jc-quote").css("fontSize", "20px");
    $("#jc-quote").css("marginBottom", "40px");
    $("#learnmore-box").css("top", $(window).height() * .5);
  } else {
    $("#jc-quote").css("display", "none");
    $("#learnmore-box").css("top", $(window).height() * .7);
  }

  // Width of background left and background right
  if($(window).width() >= 1200) {
    $("#about-background-left").css("width", "25%");
    $("#about-background-right").css("width", "75%");
  } else if($(window).width() >= 992) {
    $("#about-background-left").css("width", "33%");
    $("#about-background-right").css("width", "67%");
  } else if($(window).width() >= 768) {
    $("#about-background-left").css("width", "40%");
    $("#about-background-right").css("width", "60%");
  } else {
    $("#about-background-left").css("width", "100%");
    $("#about-background-right").css("width", "0%");
  }
}

// set diagonal positioning
function setDiagonalPosition() {
  $("#about-content-diagonal").css("left", ($(window).width()/2 + ((tanDeg(15) * $(window).height())/2)) - ($(this).scrollTop() * tanDeg(15)));
}


// set social link positioning
function setSocialLinksPosition() {
  // if hits top, move social links back in place
  if($(window).scrollTop() <= 0) {
    if($(window).width() > 1299 || $(window).width() < 768) {
      $(".social-link").css("height", 40);
      $(".social-link").css("width", 40);
      $(".social-link-box").css("height", 40);
      $(".social-link-box").css("marginLeft", (parseInt($("#about-background-left").css("width"), 10) - 290)/2 + "px");
    } else {
      $(".social-link").css("height", 35);
      $(".social-link").css("width", 35);
      $(".social-link-box").css("height", 35);
      $(".social-link-box").css("marginLeft", (parseInt($("#about-background-left").css("width"), 10) - 260)/2 + "px");
    }

    $(".visible-xs-lg").css("display", "block");
    $(".visible-md").css("display", "none");
    $(".visible-sm").css("display", "none");
  } else {
    $(".social-link-box").css("marginLeft", 10);
    $(".social-link").css("height", 35);
    $(".social-link").css("width", 35);
    $(".social-link-box").css("height", 35);

    if($(window).width() > 1199) {
      $(".visible-xs-lg").css("display", "block");
      $(".visible-md").css("display", "none");
      $(".visible-sm").css("display", "none");
    } else if($(window).width() > 991) {
      $(".visible-xs-lg").css("display", "none");
      $(".visible-md").css("display", "block");
      $(".visible-sm").css("display", "none");
    } else if($(window).width() > 767) {
      $(".visible-xs-lg").css("display", "none");
      $(".visible-md").css("display", "none");
      $(".visible-sm").css("display", "block");
    } else {

    }
  }
}

// get tangent of degree to help with diagonal scrolling
function tanDeg(o) {
  var e = o * Math.PI / 180;
  return Math.tan(e)
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
