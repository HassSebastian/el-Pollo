class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  SPACE = false;

  constructor() {
    this.pressKeboardEventTrue();
    this.pressKeboardEventFalse();
  }


  /**
   * 
   * Removes the key event listener for key release and sets the corresponding boolean properties to true.   
   *  
   */
  pressKeboardEventTrue() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 39) this.RIGHT = true;
      if (e.keyCode == 37) this.LEFT = true;
      if (e.keyCode == 38) this.UP = true;
      if (e.keyCode == 32) this.SPACE = true;
    });
  }


  /**
   * 
   * Removes the key event listener for key release and sets the corresponding boolean properties to false.
   * 
   */
  pressKeboardEventFalse() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 39) this.RIGHT = false;
      if (e.keyCode == 37) this.LEFT = false;
      if (e.keyCode == 38) this.UP = false;
      if (e.keyCode == 32) this.SPACE = false;
    });
  }
}
