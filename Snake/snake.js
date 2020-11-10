const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d")

const board_border = "black";
const board_background = "white";
const snake_col = "lightblue";
const snake_border = "darkblue";

let snake = [ {x: 200, y: 200}, {x: 190, y: 200},
  {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y:200},];

let changing_direction = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

main();

document.addEventListener("keydown", change_direction);

function main() {
  if (has_game_ended()) return;

  changing_direction = false;
  setTimeout(function onTick(){
    clearCanvas();
    move_snake();
    drawSnake();
    // Call main again
    main();
  }, 100)
}

function clearCanvas() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokeStyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokeStyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function move_snake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changing_direction) return changing_direction = true;

  const keyPressed = event.keyCode;
  const goingUp = dy == -10;
  const goingDown = dy == 10;
  const goingRight = dx == 10;
  const goingLeft = dx == -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y &lt; 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}
