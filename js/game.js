let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let realyGameOver = false;
let realyGameOverCounter = 0;
// let mobileView = false;

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
  document.getElementById("touchButtons").classList.remove("d-none");
  document.getElementById("headLine").classList.add("d-none");
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
  location.reload(true);
}


function viewportMobile() {
  requestAnimationFrame(() => {
    if (window.innerWidth > window.innerHeight) {
      document.getElementById('startScreen').classList.remove('d-none');
      document.getElementById('turnDevice').classList.add('d-none');

      // querformat
      // document.getElementById('canvasContainer').style = "width:100%;height:100%";
      // document.getElementById('canvas').style = "height:100%";
      // document.getElementById('canvas').classList.remove('d-none')

    } else {
      document.getElementById('startScreen').classList.add('d-none');
      document.getElementById('turnDevice').classList.remove('d-none');

      // hochformat
      // if (window.innerWidth < 740 || window.innerHeight < 480) {
      // document.getElementById('canvas').classList.add('d-none')
      // mobileView = true;
      // }
      // if (mobile) {
      //   document.getElementById('headline').classList.add('d-none');
      // }

    }
    viewportMobile();
  });
}