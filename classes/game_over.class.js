class GameOver extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;


  IMAGES_GameOver = [
    "img/9_intro_outro_screens/game_over/game over!.png",
    "img/9_intro_outro_screens/game_over/game over.png",
    "img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "img/9_intro_outro_screens/game_over/you lost.png"
  ];


  constructor() {
    super();
    this.loadImage(this.IMAGES_GameOver[this.randomGameOverImg()]);
  }
}
