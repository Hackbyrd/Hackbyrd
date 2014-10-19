// snake game

$(document).ready(function(){

  // Set width and height
  $("#snake_canvas").attr("width", $(window).width());
  $("#snake_canvas").attr("height", $(window).height() - 10);

  // Canvas stuff
  var canvas  = $("#snake_canvas")[0];
  var ctx     = canvas.getContext("2d");
  var w       = $("#snake_canvas").width();
  var h       = $("#snake_canvas").height();

  // colors of background and text
  var background_colors = ["#4F8CF7", "#CCCC00", "#E95959", "#55D573", "#B95EC6", "#313140"]; // Add more background colors
  var snake_colors = ["#1A4DA6", "#CC9922", "#B53838", "#2CA549", "#793C82", "#5A5A66"];      // Add more snake colors
  var color_size = background_colors.length;
  var color_index = 0;

  // Lets save the cell width in a variable for easy control
  var cw = 50;
  var d;
  var food;
  var score;

  // Lets create the snake now
  var snake_array;    // an array of cells to make up the snake

  function init() {
    d = "right";      // Default direction
    create_snake();   // Create the initial snake
    create_food();    // Now we can see the food particle
    score = 0;        // Finally lets display the score
    color_index++;    // Change color

    // Lets move the snake now using a timer which will trigger the paint function every 60ms
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  init();

  // This will create a horizontal snake starting from the top left
  function create_snake() {
    var length = 5;   // Length of the snake
    snake_array = []; // Empty array to start with

    for(var i = length - 1; i >= 0; i--) {
      snake_array.push({x: i, y:0});
    }
  }

  // Lets create the food now
  // This will create a cell with x/y between 0-44
  // Because there are 45(450/10) positions accross the rows and columns
  function create_food() {
    food = {
      x: Math.round(Math.random() * (w - cw)/cw),
      y: Math.round(Math.random() * (h - cw)/cw),
    };
  }

  // Lets paint the snake now
  function paint() {

    // To avoid the snake trail we need to paint the BG on every frame
    // Lets paint the canvas now
    ctx.fillStyle = background_colors[color_index%color_size];
    ctx.fillRect(0, 0, w, h);

    // Change body background
    $("body").css("background-color", background_colors[color_index%color_size]);

    // Take out stroke
    // ctx.strokeStyle = "black";
    // ctx.strokeRect(0, 0, w, h);

    // The movement code for the snake to come here.
    // The logic is simple
    // Pop out the tail cell and place it infront of the head cell
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    // These were the position of the head cell.
    // We will increment it to get the new head position
    // Lets add proper direction based movement now
    if (d == "right") {
      nx++;
    } else if (d == "left") {
      nx--;
    } else if (d == "up") {
      ny--;
    } else if (d == "down") {
      ny++;
    }

    // Lets add the game over clauses now
    // This will restart the game if the snake hits the wall
    // Lets add the code for body collision
    // Now if the head of the snake bumps into its body, the game will restart
    if (nx == -1 || nx >= w/cw || ny == -1 || ny >= h/cw || check_collision(nx, ny, snake_array)) {
      init(); // restart game
      return; // Lets organize the code a bit now.
    }

    // Let's write the code to make the snake eat the food
    // The logic is simple
    // If the new head position matches with that of the food,
    // Create a new head instead of moving the tail
    if (nx == food.x && ny == food.y) {
      var tail = {x: nx, y: ny};
      score++;                      // Update score
      color_index++;                // Change color
      create_food();                // Create new food
    } else {
      var tail = snake_array.pop(); //pops out the last cell
      tail.x = nx; tail.y = ny;
    } // The snake can now eat the food.

    snake_array.unshift(tail); // puts back the tail as the first cell

    for (var i = 0; i < snake_array.length; i++) {
      var c = snake_array[i];
      // Lets paint 10px wide cells
      paint_cell(c.x, c.y);
    }

    // Lets paint the food
    paint_cell(food.x, food.y);

    // Lets paint the score
    var score_text = "Score: " + score;
    ctx.font = "50px Coming Soon";
    ctx.fillText(score_text, 10, h - 5);
  }

  // Lets first create a generic function to paint cells
  function paint_cell(x, y) {
    ctx.fillStyle = snake_colors[color_index%color_size];
    ctx.fillRect(x*cw, y*cw, cw, cw);

    // Take out stroke
    // ctx.strokeStyle = "white";
    // ctx.strokeRect(x*cw, y*cw, cw, cw);
  }

  // This function will check if the provided x/y coordinates exist
  // In an array of cells or not
  function check_collision(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x == x && array[i].y == y)
       return true;
    }
    return false;
  }

  // Lets add the keyboard controls now
  $(document).keydown(function(e) {
    var key = e.which;

    //We will add another clause to prevent reverse gear
    if(key == "37" && d != "right") d = "left";
    else if(key == "38" && d != "down") d = "up";
    else if(key == "39" && d != "left") d = "right";
    else if(key == "40" && d != "up") d = "down";
  }); //The snake is now keyboard controllable

});
