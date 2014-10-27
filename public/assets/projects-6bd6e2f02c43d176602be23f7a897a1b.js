/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */


$(document).ready(function() {

  // set height to window height
  setHeights();

  // on window resize, make background fit screen height
  $(window).resize(function() {
    setHeights();
  });

  // particles
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa',
    density: 9000,
    particleRadius: 10,
    curvedLines: false,
    parallax: true,
    parallaxMultiplier: 4
  });

});

// set heights
function setHeights () {
  $(".window-height").css("height", $(window).height());
  $('.intro').css({ 'margin-top': -($('.intro').height() / 2) });
}
;
