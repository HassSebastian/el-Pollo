class Coins extends DrawableObject {
  height = 100;
  width = 100;

  offset = {
    top: 30,
    left: 50,
    right: 50,
    bottom: 20
  };


  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 2000;
    this.y = 100 + Math.random() * 150;
  }
}
