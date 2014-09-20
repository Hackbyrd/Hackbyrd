/* Hackbyrd javascript */

// Javascript
$(function(){

  // If user has not scrolled down yet, make
  // $("#stop-waiting").delay(5000).fadeIn();

  //set the units for the svg paths
  $(".jonathan_path").css("stroke-dashoffset", "1000");
  $(".jonathan_path").css("stroke-dasharray", "1000");

  //variable for the 'stroke-dashoffset' unit
  var $dashOffset = $(".jonathan_path").css("stroke-dashoffset");//.star

  //on a scroll event - execute function
  $(window).scroll(function () {

    // check if there is space left to scroll vertical
    if ($(window).height() + $(window).scrollTop() < $("html").height()) {

      //calculate how far down the page the user is
      var $percentageComplete = (($(window).scrollTop()/($("html").height() - $(window).height()))*50);

      //convert dashoffset pixel value to integer
      var $newUnit = parseInt($dashOffset, 10);

      //convert percentage complete unit to an interger
      //var $parsedPercentage = parseInt($percentageComplete, 10);

      //get the value to be subtracted from the 'stroke-dashoffset'
      var $offsetUnit = $percentageComplete * ($newUnit / 100);

      //set the new value of the dashoffset to create the drawing effect
      $(".jonathan_path").css("stroke-dashoffset", $newUnit - $offsetUnit);//.star

    } else { // if scroll is greater or equal to window height

    } // end check scroll vertical

  });

});
