const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  dx: 0,
  dy: 0,
  speed: 5,
  gravity: 0.5,
  jumpPower: -10,
  onGround: false
};

let keys = {};

function drawPlayer() {
  const img = new Image();
  img.src = 'assets/perro.png';
  ctx.drawImage(img, player.x, player.y, player.width, player.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.dy += player.gravity;
  player.y += player.dy;
  player.x += player.dx;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }

  drawPlayer();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (keys['ArrowRight']) player.dx = player.speed;
  if (keys['ArrowLeft']) player.dx = -player.speed;
  if (keys[' ']) {
    if (player.onGround) player.dy = player.jumpPower;
  }
});

document.addEventListener('keyup', e => {
  keys[e.key] = false;
  if (!keys['ArrowRight'] && !keys['ArrowLeft']) player.dx = 0;
});

document.getElementById('leftBtn').addEventListener('touchstart', () => player.dx = -player.speed);
document.getElementById('rightBtn').addEventListener('touchstart', () => player.dx = player.speed);
document.getElementById('jumpBtn').addEventListener('touchstart', () => {
  if (player.onGround) player.dy = player.jumpPower;
});
document.getElementById('leftBtn').addEventListener('touchend', () => player.dx = 0);
document.getElementById('rightBtn').addEventListener('touchend', () => player.dx = 0);

update();