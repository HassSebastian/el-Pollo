let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let realyGameOver = false;
let realyGameOverCounter = 0;
let playIndikator = false;

function init() {
  viewportMobile();
  pressBtnEve();
}


function startGameNow() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameOver();
}


async function playGame() {
  await initLevel();
  await setTimeout(startGameNow, 100);
  document.getElementById("canvasContainer").classList.remove("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("startScreenImg").classList.add("d-none");
  document.getElementById("footer").classList.add("d-none");
  document.getElementById("touchButtons").classList.remove("d-none");
  playIndikator = true;
}


function gameOver() {
  setInterval(() => {
    if (realyGameOver) {
      document.getElementById('newGame').classList.remove('d-none');
    }
  }, 10);
}


function pressBtnEve() {
  document.getElementById('upBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById('spaceBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });


  document.getElementById('upBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
  document.getElementById('spaceBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById('leftBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById('rightBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
}


function newGame() {
  playIndikator = false;
  location.reload(true);
}


function viewportMobile() {
  requestAnimationFrame(() => {
    if (/Mobil/.test(navigator.userAgent)) {
      yesMobil();
    } else {
      if (playIndikator) noMobil();
    }
    viewportMobile();
  });
}


function yesMobil() {
  if (window.innerWidth > window.innerHeight) {
    formatLandscape();
  } else {
    formatPortrait();
  }
}


function noMobil() {
  if (window.innerWidth < 720) {
    document.getElementById('canvasContainer').style = "width: 100%;";
  } else {
    document.getElementById('canvasContainer').style = "width: 720px;";
  }
}


function formatLandscape() {
  if (playIndikator) {
    document.getElementById('canvasContainer').style = "width: 100%;height: 100vh;display:block";
    document.getElementById('canvasContainer').classList.remove('d-none');
    document.getElementById('canvas').style = "width: 100%;height: 100vh;";
    document.getElementById('touchButtons').classList.remove('d-none');
  } else {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('playButton').style = "top:-265px";
  }
  document.getElementById('turnDevice').classList.add('d-none');
}


function formatPortrait() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('turnDevice').classList.remove('d-none');
  if (!(document.getElementById('canvas').classList.contains('d-none'))) {
    document.getElementById('canvasContainer').classList.add('d-none');
    document.getElementById('touchButtons').classList.add('d-none');
  }
}

