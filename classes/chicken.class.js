class Chicken extends MovableObject {
  y = 330;
  height = 90;
  width = 90;
  deadEnemy = false;

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 0
  };

  IMAGES_Walking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];


  IMMAGE_Die = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";


  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
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
