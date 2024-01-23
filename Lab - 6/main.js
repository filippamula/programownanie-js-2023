const canvas = document.getElementById("canvas").getContext("2d");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const times = [];

let innerWidth = 800;
let innerHeight = 800;

canvas.canvas.width = innerWidth;
canvas.canvas.height = innerHeight;

let amount = 20;
let distance = 250;
let balls = [];
for (let i = 0; i < amount; i++) {
  balls.push({
    x: randomExcluded(15, innerWidth - 15, null),
    y: randomExcluded(15, innerHeight - 15, null),
    vx: randomExcluded(-3, 3, 0),
    vy: randomExcluded(-3, 3, 0),
    radius: 15,
    color: "white",
  });
  console.log(balls[i]);
}

function start() {
  canvas.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < amount; i++) {
    let ball = balls[i];

    for (let j = 0; j < amount; j++) {
      let otherBall = balls[j];

      if (ball == otherBall) continue;

      let distanceBetweenBalls = Math.sqrt(
        Math.pow(ball.x - otherBall.x, 2) + Math.pow(ball.y - otherBall.y, 2)
      );

      if (distanceBetweenBalls < distance) {
        canvas.beginPath();
        canvas.moveTo(ball.x, ball.y);
        canvas.lineTo(otherBall.x, otherBall.y);
        canvas.stroke();
        canvas.closePath();
      }
    }
  }

  for (let i = 0; i < amount; i++) {
    let ball = balls[i];

    canvas.beginPath();
    canvas.strokeStyle = "black";
    canvas.fillStyle = ball.color;
    canvas.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    canvas.fill();
    canvas.stroke();

    if (ball.radius + ball.x > innerWidth) {
      ball.vx = 0 - ball.vx;
      ball.color = "pink";
    }

    if (ball.x - ball.radius < 0) {
      ball.vx = 0 - ball.vx;
      ball.color = "grey";
    }

    if (ball.y + ball.radius > innerHeight) {
      ball.vy = 0 - ball.vy;
      ball.color = "orange";
    }

    if (ball.y - ball.radius < 0) {
      ball.vy = 0 - ball.vy;
      ball.color = "aqua";
    }

    ball.x = ball.x + ball.vx;
    ball.y = ball.y + ball.vy;
  }
  requestAnimationFrame(start);
  countFps();
}

function randomExcluded(min, max, excluded) {
  var n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}

function countFps() {
  var now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;
  console.log(fps);
}

startButton.addEventListener("click", start);
restartButton.addEventListener("click", () => {
  location.reload();
});
