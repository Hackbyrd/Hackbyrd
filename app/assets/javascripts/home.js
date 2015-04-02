/* Hackbyrd javascript */

// scroll to an element
function scrollToElement(target) {
  var speed = 5000;
  var destination = jQuery(target).offset().top;
  jQuery( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: destination}, speed, function() {
      window.location.hash = target;
  });
  return false;
}

// Javascript
$(document).ready(function() {

  // prevent scrolling for mouse
  $(window).bind('mousewheel', function(e) {
    if(e.originalEvent.wheelDeltaY != 0)
      e.preventDefault();
  });

  // scroll to bottom
  $("body").on("click", "#click-me", function() {
    scrollToElement("#bottom-nav");
  });

  // If user has not scrolled down yet, make
  // $("#stop-waiting").delay(5000).fadeIn();

  // $("#jonathan-chen-svg").css("background", "background: rgba(79, 140 ,247, 0);")

  // set empty space height based off of window size
  $(".empty-space").css("height", $(window).height() * 2.5555);

  // set jc-logo position
  $("#jc-logo").css("top", $(window).scrollTop() - ($(window).height() * 2));

  //set the units for the svg paths
  $(".jonathan_path").css("stroke-dashoffset", "1000");
  $(".jonathan_path").css("stroke-dasharray", "1000");

  // variable for the 'stroke-dashoffset' unit
  var $dashOffset = $(".jonathan_path").css("stroke-dashoffset");//.star

  // scroll position
  var $last_scroll_position = 0;

  //on a scroll event - execute function
  $(window).scroll(function() {

    // check if there is space left to scroll vertical
    if ($(window).scrollTop() > 0 && $(window).height() + $(window).scrollTop() < $("html").height()) {

      // make logo absolute
      $("#jc-logo").css('position', 'absolute');
      $('.jonathan-chen-svg').css('position', 'absolute');

      //calculate how far down the page the user is
      var $percentageComplete = (($(window).scrollTop()/($("html").height() - $(window).height())) * 36);

      //convert dashoffset pixel value to integer
      var $newUnit = parseInt($dashOffset, 10);

      //convert percentage complete unit to an interger
      //var $parsedPercentage = parseInt($percentageComplete, 10);

      //get the value to be subtracted from the 'stroke-dashoffset'
      var $offsetUnit = $percentageComplete * ($newUnit / 100);

      //set the new value of the dashoffset to create the drawing effect
      $(".jonathan_path").css("stroke-dashoffset", $newUnit - $offsetUnit);//.star

      var currTopLogo = $(window).scrollTop() - ($(window).height() * 2);
      var currTopText = $(window).scrollTop() - ($(window).height() * 1.3)
      var speed = $(window).scrollTop() * 2;

      // the point in which the jc logo moves with the jonathan chen text
      if ($(window).scrollTop() < $(window).height() * 1.7) {

        // scrolling down
        if ($last_scroll_position - $(window).scrollTop() < 0) {
          $("#jc-logo").css("top", currTopLogo + speed);

          // move jonathan chen text down
          if ($(window).scrollTop() >= $(window).height() * 1.3) {
            $('.jonathan-chen-svg').css("top", currTopText + speed);
          } else { // jonathan chen text stays in same place
            $(".jonathan-chen-svg").css("top", speed);
          }

        // scrolling up
        } else {
          $("#jc-logo").css("top", currTopLogo + speed);

          // move jonathan chen text up
          if ($(window).scrollTop() <= $(window).height() * 1.7 && $(window).scrollTop() > $(window).height() * 1.3) {
            $('.jonathan-chen-svg').css("top", currTopText + speed);
          } else { // jonathan chen text stays in same place
            $(".jonathan-chen-svg").css("top", speed);
          }

        }

      // the point in which the jc logo and jonathan chen text locks in place
      } else {
        $("#jc-logo").css("top", (currTopLogo + speed) + ($(window).height() * 1.7) - $(window).scrollTop());
        $(".jonathan-chen-svg").css("top", (currTopText + speed) + ($(window).height() * 1.7) - $(window).scrollTop());
      }

      // updated the last_scroll_position
      $last_scroll_position = $(window).scrollTop();

    // if scroll is greater or equal to window height divided by two (halfway point)
    } else {

      // scroll past bottom
      if ($(window).scrollTop() > 0) {

        // jonathan chen text is fully visible
        $(".jonathan_path").css("stroke-dashoffset", 0);

        // jc-logo is fixed
        $("#jc-logo").css({
          position: 'fixed',
          top: -$(window).height()/3.3
        });

        // jonathan chen text is fixed
        $(".jonathan-chen-svg").css({
          position: 'fixed',
          top: $(window).height()/2.53
        });

        // fill in jonathan chen text
        // $(".jonathan_path").css("fill", "#1A4DA6");

      // scroll past top
      } else {

        // jonathan chen text is hidden
        $(".jonathan_path").css("stroke-dashoffset", "1000");

        // jc logo is nidden
        $("#jc-logo").css("top", -($(window).height() * 2));

        // jonathan chen text is centered
        $('.jonathan-chen-svg').css("top", 0);

      }

    } // end check scroll vertical

  }); // end on scroll

  // nav-link is clicked
  $('a').click( function(e) {
    e.preventDefault(); // prevent from going to link

    $("#corner").click(); // set off corner loader

    var $this_a = $(this); // store this link that was clicked

    // delay then go to link
    window.setTimeout(function(){
      if ($this_a.attr('href') != null) {
        window.location.href = $this_a.attr('href');
      }
    }, 1000);

    return false;
  });

});
