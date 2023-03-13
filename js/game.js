let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let realyGameOver = false;
let realyGameOverCounter = 0;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameOver();
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


function playGame() {
  init();
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}


function gameOver() {
  setInterval(() => {
    if (realyGameOver) {
      document.getElementById('newGame').classList.remove('d-none');
    }
  }, 500);
}


function newGame() {
  location.reload(true);
}