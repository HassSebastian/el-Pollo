let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let realyGameOver = false;
let realyGameOverCounter = 0;
let playIndikator = false;

function init() {
  viewportMobile();
}

function startGameNow() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameOver();
}

async function playGame() {
  await initLevel();
  await setTimeout(startGameNow, 100);
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("startScreenImg").classList.add("d-none");
  document.getElementById("footer").classList.add("d-none");
  document.getElementById("touchButtons").classList.remove("d-none");
  playIndikator = true;
}


window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
});


window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
});


function gameOver() {
  setInterval(() => {
    if (realyGameOver) {
      document.getElementById('newGame').classList.remove('d-none');
    }
  }, 10);
}


function newGame() {
  playIndikator = false;
  location.reload(true);
}


function viewportMobile() {
  requestAnimationFrame(() => {
    if (window.innerWidth > window.innerHeight) {
      formatLandscape();
    } else {
      formatPortrait();
    }
    viewportMobile();
  });
}

function formatLandscape() {
  if (playIndikator) {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('touchButtons').classList.remove('d-none');
  } else {
    document.getElementById('startScreen').classList.remove('d-none');
  }
  document.getElementById('turnDevice').classList.add('d-none');
}

function formatPortrait() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('turnDevice').classList.remove('d-none');
  if (!(document.getElementById('canvas').classList.contains('d-none'))) {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('touchButtons').classList.add('d-none');
  }
}

