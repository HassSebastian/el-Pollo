class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  SPACE = false;

  constructor() {
    this.pressKeboardEvent();
    // setTimeout(this.pressBtnEvent, 3000);
  }


  pressKeboardEvent() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 39) {
        this.RIGHT = true;
      }
      if (e.keyCode == 37) {
        this.LEFT = true;
      }
      if (e.keyCode == 38) {
        this.UP = true;
      }
      if (e.keyCode == 32) {
        this.SPACE = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 39) {
        this.RIGHT = false;
      }
      if (e.keyCode == 37) {
        this.LEFT = false;
      }
      if (e.keyCode == 38) {
        this.UP = false;
      }
      if (e.keyCode == 32) {
        this.SPACE = false;
      }
    });

  }

}
