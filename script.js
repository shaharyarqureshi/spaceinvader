const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const shipWidth = 40;
const shipHeight = 20;
const shipSpeed = 5;
let shipX = canvas.width / 2 - shipWidth / 2;
let shipY = canvas.height - shipHeight - 10;
let leftPressed = false;
let rightPressed = false;

const bulletRadius = 5;
const bulletSpeed = 5;
let bulletX = 0;
let bulletY = 0;
let bulletFired = false;

const invaderRowCount = 3;
const invaderColumnCount = 8;
const invaderWidth = 40;
const invaderHeight = 20;
const invaderPadding = 10;
const invaderOffsetTop = 30;
const invaderOffsetLeft = 30;
const invaders = [];
for (let c = 0; c < invaderColumnCount; c++) {
  invaders[c] = [];
  for (let r = 0; r < invaderRowCount; r++) {
    invaders[c][r] = { x: 0, y: 0, alive: true };
  }
}

let score = 0;

function drawShip() {
  ctx.beginPath();
  ctx.rect(shipX, shipY, shipWidth, shipHeight);
  ctx.fillStyle = "#00FF00";
  ctx.fill();
  ctx.closePath();
}

function drawBullet() {
  if (bulletFired) {
    ctx.beginPath();
    ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
  }
}

function drawInvaders() {
  for (let c = 0; c < invaderColumnCount; c++) {
    for (let r = 0; r < invaderRowCount; r++) {
      if (invaders[c][r].alive) {
        const invaderX =
          c * (invaderWidth + invaderPadding) + invaderOffsetLeft;
        const invaderY =
          r * (invaderHeight + invaderPadding) + invaderOffsetTop;
        invaders[c][r].x = invaderX;
        invaders[c][r].y = invaderY;
        ctx.beginPath();
        ctx.rect(invaderX, invaderY, invaderWidth, invaderHeight);
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < invaderColumnCount; c++) {
    for (let r = 0; r < invaderRowCount; r++) {
      const invader = invaders[c][r];
      if (invader.alive) {
        if
if (
bulletX > invader.x &&
bulletX < invader.x + invaderWidth &&
bulletY > invader.y &&
bulletY < invader.y + invaderHeight
) {
bulletFired = false;
invader.alive = false;
score++;
if (score === invaderRowCount * invaderColumnCount) {
alert("Congratulations! You win!");
document.location.reload();
}
}
}
}
}
}

function drawScore() {
ctx.font = "16px Arial";
ctx.fillStyle = "#00FF00";
ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawShip();
drawBullet();
drawInvaders();
collisionDetection();
drawScore();

if (leftPressed && shipX > 0) {
shipX -= shipSpeed;
}
if (rightPressed && shipX < canvas.width - shipWidth) {
shipX += shipSpeed;
}

if (bulletFired) {
bulletY -= bulletSpeed;
if (bulletY < 0) {
bulletFired = false;
}
}

requestAnimationFrame(draw);
}

function keyDownHandler(event) {
if (event.key === "ArrowLeft" || event.key === "Left") {
leftPressed = true;
} else if (event.key === "ArrowRight" || event.key === "Right") {
rightPressed = true;
} else if (event.key === " " || event.key === "Spacebar") {
if (!bulletFired) {
bulletX = shipX + shipWidth / 2;
bulletY = shipY;
bulletFired = true;
}
}
}

function keyUpHandler(event) {
if (event.key === "ArrowLeft" || event.key === "Left") {
leftPressed = false;
} else if (event.key === "ArrowRight" || event.key === "Right") {
rightPressed = false;
}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();