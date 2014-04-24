/* Hackbyrd javascript */

// Javascript
$(function(){

  /* intro titles fade in */
  // $("#title-entreprenuer").hide();
  // $("#title-engineer").hide();
  // $("#title-terp").hide();
  // $("#title-entreprenuer").fadeIn(750, function(){
  //   $("#title-engineer").delay(1000).fadeIn(750, function(){
  //     $("#title-terp").delay(250).fadeIn(750, function(){
  //     });
  //   });
  // });

  /* navigation bar links scrollto */
  $('#nav-name').click(function(e) { 
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });
  $('#nav-about').click(function(e) { 
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#about').offset().top - 60 }, 1000);
  });
  $('#nav-fiscalnote').click(function(e) { 
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#fiscalnote').offset().top - 60 }, 1000);
  });
  $('#nav-maryland').click(function(e) { 
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#maryland').offset().top - 60 }, 1000);
  });
  $('#nav-contact').click(function(e) { 
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#footer').offset().top - 60 }, 1000);
  });

});