$(document).ready(function() {
  // set height of navigation
  $(".side-navigation").css("height", $(window).height());
  $(".link-box").css("height", $(window).height());

  // on window resize, make height the same
  $(window).resize(function() {
    $(".side-navigation").css("height", $(window).height());
    $(".link-box").css("height", $(window).height());
  });

  // when action box is closed, open navigation
  $(document).on("mouseenter", ".action-box", function(e) {

    // if side navigation is showing
    if (parseInt($(".side-navigation").css("right"), 10) < 0) {

      // fade out 3line icon and fade in cross icon
      $('#three-lines-icon').fadeOut('fast', function () {
        $('#cross-icon').delay(200).fadeIn('fast');
      });

      // slide side bar out
      $( ".side-navigation" ).animate({
        right: "0px",
      }, 200, "linear");

    }

  }).on('mouseleave','.action-box',  function(){

  });

  // when action box is open, close navigation
  $(document).on("click", ".action-box", function(e) {

    // if side navigation is showing
    if (parseInt($(".side-navigation").css("right"), 10) == 0) {

       // fade out 3line icon and fade in cross icon
      $('#cross-icon').fadeOut('fast', function () {
        $('#three-lines-icon').delay(200).fadeIn('fast');
      });

      // slide side bar in
      $( ".side-navigation" ).animate({
        right: "-150px",
      }, 200, "linear");

    }

  });

});

