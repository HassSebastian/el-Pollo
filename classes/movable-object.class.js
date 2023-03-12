class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 0;
  lastHit = 0;
  salsa_bottles = 0;
  coin = 0;
  music_sound = new Audio("audio/music.mp3");
  coin_sound = new Audio("audio/collect-coins.mp3");
  bottles_sound = new Audio("audio/bottles.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  walking_sound = new Audio("audio/walking.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  win_sound = new Audio("audio/win.mp3");
  chicken_sound = new Audio("audio/chicken.mp3");
  throw_sound = new Audio("audio/throw.mp3");
  dying_sound = new Audio("audio/dying.mp3");
  hitChicken_sound = new Audio("audio/hitChicken.mp3");
  spawnBoss_sound = new Audio("audio/spawn_endboss.mp3");
  hitBoss_sound = new Audio("audio/hit_endboss.mp3");
  snoring_sound = new Audio("audio/snoring.mp3");
  

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy += 5;
    if (this.energy >= 99) {
      this.energy = 100;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000; //sekunden
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 100;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  collisionWithCoin(coins) {
    let coinsx = coins.x;
    const index = world.level.coins.findIndex((item) => item.x === coinsx);
    this.world.level.coins.splice(index, 1);
    this.coin += 10;
    this.coin_sound.play();
    this.coin_sound.volume = 0.2;
  }

  collisionWithBottles(bottles) {
    if (this.salsa_bottles <= 100) {
      let bottlesx = bottles.x;
      const index = world.level.bottles.findIndex(
        (item) => item.x === bottlesx
      );
      this.world.level.bottles.splice(index, 1);
      this.salsa_bottles += 10;
      this.bottles_sound.play();
      this.bottles_sound.volume = 0.1;
    }
  }

  isCollidingFromUp(enemy) {
    let enemyx = enemy.x;
    let index = world.level.enemies.findIndex((item) => item.x === enemyx);
    world.level.enemies[index].energy = 100;
    world.level.enemies[index].speed = 0;
    world.level.enemies[index].deadEnemy = true;
    this.hitChicken_sound.play();
    this.hitChicken_sound.volume = 0.2;
  }

  diffrentBossToCharacter() {
    let result = world.level.enemies[0].x - world.character.x;
    return result;
  }

  winAnimation() {
    if (world.level.enemies[0].energy === 100) {
      return true;
    }
  }
  
}
