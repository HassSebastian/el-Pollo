class Chicken_smal extends MovableObject {
  y = 370;
  height = 60;
  width = 60;
  deadEnemy = false;

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 0
  };

  IMAGES_Walking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];


  IMMAGE_Die = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";


  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_Walking);
    this.loadImage(this.IMMAGE_Die);
    this.x = 200 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }


  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_Walking);
      if (this.isDead()) this.loadImage(this.IMMAGE_Die);
    }, 100);
  }
}
