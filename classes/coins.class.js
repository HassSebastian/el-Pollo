class Coins extends DrawableObject {
  height = 100;
  width = 100;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 2000;
    this.y = 100 + Math.random() * 150;
  }
}
