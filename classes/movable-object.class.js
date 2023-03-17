class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 0;
  lastHit = 0;
  salsa_bottles = 0;
  coin = 0;
  isRealyDead = 0;


  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };


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


  /**
   * 
   * Applies gravity to the character by decreasing its `y` position based on its current `speedY`.
   * 
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }


  /**
   * 
   * Checks whether the object is above the ground or not.
   * If the object is a ThrowableObject, it always returns true.
   * Otherwise, it checks if the object's y position is less than 120.
   *
   * @return {boolean} True if the object is above the ground, false otherwise.
   * 
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < 120;
  }


  /**
   * Determines whether this object is colliding with another object.
   *
   * @param {Object} mo - The object to check collision with.
   * @returns {boolean} - True if the objects are colliding, false  
   * 
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  /**
   * 
   * Increases the player's energy by 5 and sets the `lastHit` property to the current time.
   * If the player's energy is greater than or equal to 99, it sets it to 100.
   * 
   */
  hit() {
    this.energy += 5;
    if (this.energy >= 99) this.energy = 100;
    else this.lastHit = new Date().getTime();
  }


  /**
  * 
  * Returns true if the character was hurt within the last second, false otherwise.
  * 
  * @returns {boolean} - true if the character was hurt recently, false otherwise.
  * 
  */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }


  /**
   * 
   * Checks if the character is dead (energy = 100).
   *
   * @returns {boolean} True if the character is dead, false otherwise.
   * 
   */
  isDead() {
    return this.energy == 100;
  }


  /**
   * 
   * Moves the object to the right by updating its x position with its speed attribute.
   * Also sets the otherDirection attribute to false.
   * 
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * 
   * Moves the object to the left by decreasing its x-coordinate based on its current speed.
   * 
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * 
   * Plays the animation using the given array of image paths.
   * 
   * @param {string[]} images - An array of image paths for the animation.
   * 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * 
   * Detects a collision with a coin and updates the player's score.
   *
   * @param {Coin} coins - The coin that collided with the player
   * 
   */
  collisionWithCoin(coins) {
    let coinsx = coins.x;
    const index = world.level.coins.findIndex((item) => item.x === coinsx);
    this.world.level.coins.splice(index, 1);
    this.coin += 10;
    this.coin_sound.play();
    this.coin_sound.volume = 0.2;
  }


  /**
   * 
   * Handles collision between the player and bottles.
   *
   * @param {Object} bottles - The bottles object that the player collided with.
   * 
   */
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


  /**
   * 
   * Checks if the player is colliding with an enemy from above and kills the enemy if so.
   * 
   * @param {Object} enemy - The enemy object to check collision with.
   * 
   */
  isCollidingFromUp(enemy) {
    let enemyx = enemy.x;
    let index = world.level.enemies.findIndex((item) => item.x === enemyx);
    world.level.enemies[index].energy = 100;
    world.level.enemies[index].speed = 0;
    world.level.enemies[index].deadEnemy = true;
    this.hitChicken_sound.play();
    this.hitChicken_sound.volume = 0.2;
  }


  /**
   * 
   * Calculates the difference between the position of the first boss in the level and the character.
   * 
   * @returns {number} The difference between the positions of the boss and character.
   * 
   */
  diffrentBossToCharacter() {
    let result = world.level.enemies[0].x - world.character.x;
    return result;
  }


  /**
   * 
   * Check if the character is dead.
   *
   * @return {boolean} Returns true if the character's energy is 100, indicating that they are dead.
   * 
   */
  characterIsDead() {
    if (world.character.energy === 100) return true;
  }


  /**
   * 
   * Checks if the enemy's energy is 100, indicating that the player has won the game.
   *
   * @returns {boolean} - Returns `true` if the enemy's energy is 100, otherwise `false`.
   * 
   */
  winAnimation() {
    if (world.level.enemies[0].energy === 100) return true;
  }


  /**
   * 
   * Generates a random number between 0 and 2 (inclusive) to be used as an index for the game over images array.
   * 
   * @returns {number} A random number between 0 and 2 (inclusive).
   * 
   */
  randomGameOverImg() {
    let result = Math.floor(Math.random() * 3);
    return result;
  }

}
