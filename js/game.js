let canvas;
let intervalIds = [];
let world;
let keyboard = new Keyboard();
let realyGameOver = false;
let realyGameOverCounter = 0;
let playIndikator = false;


function init() {
  viewportMobile();
  pressBtnEveTrue();
  pressBtnEveFalse();
}


/** Start and Play **
 * 
 * 
 * 
 * 
 */
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



/** Mobil Buttons **
 * 
 * 
 */
function pressBtnEveTrue() {
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
}


function pressBtnEveFalse() {
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



/** Desktop - Mobil - Check **
 * 
 * 
 * 
 */
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


/** GameOver Fuction **
 * 
 * 
 * 
 * @param {*} fn 
 * @param {*} time 
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


function stopGame() {
  intervalIds.forEach(clearInterval);
}


function gameOver() {
  setStoppableInterval(() => {
    if (realyGameOver) {
      document.getElementById('newGame').classList.remove('d-none');
      stopGame();
    }
  }, 10);
}


function newGame() {
  playIndikator = false;
  canvas.getContext("2d").clearRect(0, 0, 720, 480);
  intervalIds = [];
  realyGameOver = false;
  document.getElementById("canvasContainer").classList.add("d-none");
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("newGame").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("startScreenImg").classList.remove("d-none");
  document.getElementById("footer").classList.remove("d-none");
}


function randomGameOverImg() {
  let result = Math.floor(Math.random() * 4);
  console.log(result);
  // return result;
}
