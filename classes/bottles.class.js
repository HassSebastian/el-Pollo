class Bottles extends DrawableObject {
  height = 80;
  width = 80;
  y = 370;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 2000;
  }
}
