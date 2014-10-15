//http://codepen.io/anon/pen/idvoh

//On scroll call the draw function
$(window).scroll(function() {
  drawLines();
});

//If you have more than one SVG per page this will pick it up
function drawLines() {

  // var array = $(".timeline-draw");

  // for (var i = 0; i < array.length; i++) {
  //   drawLine($("#route"), array[i]);
  // }

  $.each($("timeline-draw"), function(i, val) {
    var line = val;
    drawLine($(this), line);
  });
}

//draw the line
function drawLine(container, line) {
  console.log("fish");
  var length = 0;
  var pathLength = line.getTotalLength();
  var distanceFromTop = container.offset().top - $(window).scrollTop();
  var percentDone = 1 - (distanceFromTop / $(window).height());
  length = percentDone * pathLength;
  line.style.strokeDasharray = [length,pathLength].join(' ');
  console.log("strokeDasharray: " + [length,pathLength].join(' '));
}

// $(document).ready(function(){

//   $(window).scroll(function() {
//     drawLine( $('#route'), document.getElementById('timeline-draw') );
//   });

//   // init the line length
//     drawLine( $('#route'), document.getElementById('timeline-draw') );

//   //draw the line
//   function drawLine(container, line){

//     var pathLength = line.getTotalLength();
//     var maxScrollTop = $(document).height() - $(window).height();
//     var percentDone = $(window).scrollTop() / maxScrollTop;
//     var length = percentDone * pathLength;
//     line.style.strokeDasharray = [ length ,pathLength].join(' ');
//   }

// });
