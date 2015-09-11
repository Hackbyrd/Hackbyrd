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
  $('body').on('click', '#click-me', function() {
    scrollToElement('#bottom-nav');
  });

  // If user has not scrolled down yet, make
  // $('#stop-waiting').delay(5000).fadeIn();

  // $('#jonathan-chen-svg').css('background', 'background: rgba(79, 140 ,247, 0);')

  var winHeight = $(window).height();

  // set empty space height based off of window size
  $('.empty-space').css('height', winHeight * 2.5555);

  // set jc-logo position
  $('#jc-logo').css('top', $(window).scrollTop() - (winHeight * 2));

  //set the units for the svg paths
  var jonathanPath = $('.jonathan_path');
  jonathanPath.css('stroke-dashoffset', '1000');
  jonathanPath.css('stroke-dasharray', '1000');

  // variable for the 'stroke-dashoffset' unit
  var $dashOffset = jonathanPath.css('stroke-dashoffset');//.star

  // scroll position
  var $last_scroll_position = 0;

  //on a scroll event - execute function
  $(window).on('scroll', function(e) {

    var winScrollTop = $(window).scrollTop();
    var winHeight = $(window).height();
    var htmlHeight = $('html').height();
    var jcLogo = $('#jc-logo');
    var jcSVG = $('.jonathan-chen-svg');
    var jPath = $('.jonathan_path');

    // check if there is space left to scroll vertical
    if (winScrollTop > 0 && winHeight + winScrollTop < htmlHeight) {

      // make logo absolute
      // jcLogo.css('position', 'absolute');
      // jcSVG.css('position', 'absolute');

      //calculate how far down the page the user is
      var $percentageComplete = ((winScrollTop/(htmlHeight - winHeight)) * 36);

      //convert dashoffset pixel value to integer
      var $newUnit = parseInt($dashOffset, 10);

      //convert percentage complete unit to an interger
      //var $parsedPercentage = parseInt($percentageComplete, 10);

      //get the value to be subtracted from the 'stroke-dashoffset'
      var $offsetUnit = $percentageComplete * ($newUnit / 100);

      //set the new value of the dashoffset to create the drawing effect
      jPath.css('stroke-dashoffset', $newUnit - $offsetUnit);//.star

      var currTopLogo = winScrollTop - (winHeight * 2);
      var currTopText = winScrollTop - (winHeight * 1.3)
      var speed = winScrollTop * 2;

      // the point in which the jc logo moves with the jonathan chen text
      if (winScrollTop < winHeight * 1.7) {

        // scrolling down
        if ($last_scroll_position - winScrollTop < 0) {
          jcLogo.css('top', currTopLogo + speed);

          // move jonathan chen text down
          if (winScrollTop >= winHeight * 1.3) {
            jcSVG.css('top', currTopText + speed);
          } else { // jonathan chen text stays in same place
            jcSVG.css('top', speed);
          }

        // scrolling up
        } else {
          jcLogo.css('top', currTopLogo + speed);

          // move jonathan chen text up
          if (winScrollTop <= winHeight * 1.7 && winScrollTop > winHeight * 1.3) {
            jcSVG.css('top', currTopText + speed);
          } else { // jonathan chen text stays in same place
            jcSVG.css('top', speed);
          }

        }

      // the point in which the jc logo and jonathan chen text locks in place
      } else {
        jcLogo.css('top', (currTopLogo + speed) + (winHeight * 1.7) - winScrollTop);
        jcSVG.css('top', (currTopText + speed) + (winHeight * 1.7) - winScrollTop);
      }

      // updated the last_scroll_position
      $last_scroll_position = winScrollTop;

    // if scroll is greater or equal to window height divided by two (halfway point)
    } else {

      // scroll past bottom
      if (winScrollTop > 0) {

        // jonathan chen text is fully visible
        jPath.css('stroke-dashoffset', 0);

        // jc-logo is fixed
        jcLogo.css({
          position: 'fixed',
          top: -winHeight/3.3
        });

        // jonathan chen text is fixed
        jcSVG.css({
          position: 'fixed',
          top: winHeight/2.53
        });

        // fill in jonathan chen text
        // jPath.css('fill', '#1A4DA6');

      // scroll past top
      } else {

        // jonathan chen text is hidden
        jPath.css('stroke-dashoffset', '1000');

        // jc logo is nidden
        jcLogo.css('top', -(winHeight * 2));

        // jonathan chen text is centered
        jcSVG.css('top', 0);

      }

    } // end check scroll vertical

  }); // end on scroll

  // nav-link is clicked
  $('a').click( function(e) {
    e.preventDefault(); // prevent from going to link

    $('#corner').click(); // set off corner loader

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
