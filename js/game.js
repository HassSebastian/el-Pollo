let canvas;
let intervalIds = [];
let world;
let keyboard = new Keyboard();
let realyGameOver = false;
let realyGameOverCounter = 0;
let playIndikator = false;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  viewportMobile();
  pressBtnEveTrue();
  pressBtnEveFalse();

}


/********** Start and Play **********
*
* Initializes the level
*
*/
async function playGame() {
  playIndikator = true;
  setTimeout(await initLevel, 1000);
  // await setTimeout(startGameNow, 100);
  // document.getElementById("canvasContainer").classList.remove("d-none");
  // document.getElementById("canvas").classList.remove("d-none");
  // document.getElementById("startScreen").classList.add("d-none");
  // document.getElementById("startScreenImg").classList.add("d-none");
  // document.getElementById("footer").classList.add("d-none");
  // document.getElementById("touchButtons").classList.remove("d-none");
  gameOver();

}


/**
 * 
 * start the game
 * 
 */
// function startGameNow() {
// }


/*********** Mobil Buttons ***********
 * 
 * Attaches touchstart event listeners to the arrow and space buttons, 
 * and sets the corresponding keyboard properties to true
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


/**
 * 
 * Attaches touchstart event listeners to the arrow and space buttons, 
 * and sets the corresponding keyboard properties to false
 * 
 */
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


/********** Desktop - Mobil - Check **********
 *
 * Checks if the current device is mobile and calls yesMobil() if it is. 
 * If not, calls noMobil() if the game is currently being played.
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


/**
 * 
 * Formats the game layout for mobile devices in landscape or portrait mode
 * 
 */
function yesMobil() {
  if (window.innerWidth > window.innerHeight) {
    formatLandscape();
  } else {
    formatPortrait();
  }
}


/**
 * 
 * Formats the game layout for non-mobile devices.
 * 
 */
function noMobil() {
  if (window.innerWidth < 720) {
    document.getElementById('canvasContainer').style = "width: 100%;";
  } else {
    document.getElementById('canvasContainer').style = "width: 720px;";
  }
}


/**
 * 
 * Formats the game layout for landscape mode on mobile devices.
 * 
 */
function formatLandscape() {
  if (!playIndikator) {
    document.getElementById('canvasContainer').style = "width: 100%;height: 100vh;display:block";
    document.getElementById('canvasContainer').classList.remove('d-none');
    document.getElementById('canvas').style = "width: 100%;height: 100vh;";
    document.getElementById('playButton').style = "top:0";
    document.getElementById('turnDevice').classList.add('d-none');
  } else {
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('touchButtons').classList.remove('d-none');

  }
}


/**
 * 
 * Formats the game layout for portrait mode on mobile devices.
 * 
 */
function formatPortrait() {
  document.getElementById('turnDevice').classList.remove('d-none');
  if (!(document.getElementById('canvas').classList.contains('d-none'))) {
    document.getElementById('canvasContainer').classList.add('d-none');
    document.getElementById('touchButtons').classList.add('d-none');
  }
}


/********** GameOver Fuction **********
 * 
 * Sets a recurring timeout that can be stopped by calling the stop() method.
 * 
 * @function
 * @param {function} fn - The function to be called at each interval.
 * @param {number} time - The time in milliseconds between each interval.
 * 
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * 
 * Stops all recurring timeouts set by the setStoppableInterval function.
 * 
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
}


/**
 * 
 * Sets a recurring interval to check if the game is over, and shows the "New Game" button if it is.
 * 
 */
function gameOver() {
  setStoppableInterval(() => {
    if (realyGameOver) {
      document.getElementById('newGame').classList.remove('d-none');
      stopGame();
    }
  }, 10);
}


/**
* 
* Generates a random number between 0 and 2 (inclusive) to select a game over image.

* @function
* @returns {number} A random number between 0 and 2 (inclusive). 
*
*/
function randomGameOverImg() {
  let result = Math.floor(Math.random() * 3);
  return result;
}


/**
 * 
 * reset all variables and canvas
 * 
 */
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

