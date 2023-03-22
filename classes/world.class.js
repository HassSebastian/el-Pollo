class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBottles = new StautusBottles();
  statusCoin = new StatusCoin();
  statusEndBoss = new StatusEndBoss();
  gameOver = new GameOver();
  throwableObject = [];



  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runCollision();
    this.runThrowObjects();
  }


  /**
   * 
   * Sets the world for the character.
   * 
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * 
   * Starts running the game loop, which checks for collisions and thrown objects every 300 milliseconds.
   * 
   */
  runCollision() {
    setStoppableInterval(() => {
      this.checkCollision();
    }, 70);
  }
  runThrowObjects() {
    setStoppableInterval(() => {
      this.checkThroObjects();
    }, 100);
  }


  /**
   * 
   * Checks if the SPACE key is pressed and the percentage of status bottles is greater than or equal to 10.
   * If both conditions are met, throws a bottle and deletes the thrown bottle.
   * 
   */
  checkThroObjects() {
    if (this.keyboard.SPACE && this.statusBottles.percentage >= 10) {
      this.throwBottle();
      this.deleteThrownBottle();
    }
  }


  /**
   * 
   * Creates a new bottle object at the character's position, adds it to the list of throwable objects,
   * and updates the status of remaining bottles and character'
   * 
   */
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.throwableObject.push(bottle);
    this.statusBottles.percentage -= 10;
    this.character.salsa_bottles -= 10;
    this.statusBottles.setPercentage(this.statusBottles.percentage);
  }


  /**
   * 
   * Deletes the first thrown bottle object from the list of throwable objects if it has moved beyond a certain point.
   * 
   */
  deleteThrownBottle() {
    if (this.throwableObject.length >= 1 && this.throwableObject[0].y > 300) this.throwableObject.splice(0, 1);
  }


  /********** CheckCollision **********
   * 
   * 
   */
  checkCollision() {
    this.collisionWithEnemyWhileWorking();
    this.bottleLooting();
    this.coinLooting();
    this.endBossHit();
  }


  /**
   * 
   * Checks if the character collides with an enemy while working. If so, reduces the character's energy and updates the status bar.
   * Also checks if the character jumps on an enemy, and if so, makes the character collide from above.
   * 
   */
  collisionWithEnemyWhileWorking() {
    this.level.enemies.forEach((enemy) => {
      if (this.collisionWithAnEnemyWhileWalking(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
      if (this.jumpOnAnEnemy(enemy)) this.character.isCollidingFromTop(enemy);
    });
  }


  /**
   * 
   * Checks if the character collides with an enemy while walking, and returns a boolean value indicating the result.
   * 
   * @param {Object} enemy - The enemy object to check collision with.
   * @returns {boolean} - A boolean value indicating if the character collides with the given enemy while walking.
   * 
   */
  collisionWithAnEnemyWhileWalking(enemy) {
    return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.deadEnemy || this.character.isColliding(this.level.enemies[0]);
  }


  /**
   * 
   * Checks if the character jumps on an enemy, and returns a boolean value indicating the result.
   * 
   * @param {Object} enemy - The enemy object to check for collision.
   * @returns {boolean} - A boolean value indicating if the character jumps on the given enemy.
   * 
   */
  jumpOnAnEnemy(enemy) {
    return this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isColliding(this.level.enemies[0]);
  }


  /**
   * 
   * Checks if the character collides with any bottle objects in the level, and performs bottle looting calculation if a collision occurs.
   * 
   */
  bottleLooting() {
    this.level.bottles.forEach((bottles) => {
      if (this.character.isColliding(bottles)) this.bottleLootingCalculation(bottles);
    });
  }


  /**
   * 
   * Performs bottle looting calculation for the character based on the given bottle object.
   * 
   * @param {Object} bottles - The bottle object to calculate looting for.
   * 
   */
  bottleLootingCalculation(bottles) {
    this.statusBottles.setPercentage(this.character.salsa_bottles);
    this.character.collisionWithBottles(bottles);
  }


  /**
   * 
   * Checks if the character collides with any coin objects in the level, and performs coin looting calculation if a collision occurs.
   * 
   */
  coinLooting() {
    this.level.coins.forEach((coins) => {
      if (this.character.isColliding(coins)) this.coinLootingCalculation(coins);
    });
  }


  /**
   * 
   * Performs coin looting calculation for the character based on the given coin object.
   * 
   * @param {Object} coins - The coin object to calculate looting for.
   * 
   */
  coinLootingCalculation(coins) {
    this.statusCoin.setPercentage(this.character.coin);
    this.character.collisionWithCoin(coins);
  }


  /**
   * 
   * Checks if any throwable object collides with the end boss enemy and performs end boss hit percentage calculation if a collision occurs.
   * 
   */
  endBossHit() {
    this.throwableObject.forEach((bottle) => {
      if (this.level.enemies[0].isColliding(bottle)) this.endBossHitPercentCalculation(bottle);
    });
  }


  /**
   * 
   * Calculates the end boss hit percentage and updates the status bar based on the given bottle object.
   * 
   */
  endBossHitPercentCalculation(bottle) {
    this.level.enemies[0].hit();
    this.throwableObject.slice(bottle, 1);
    this.statusEndBoss.setPercentage(this.level.enemies[0].energy);
  }


  /********** Draw **********
   * 
   * Clears the canvas, sets the camera position, draws the background, status bars, character, and level objects,
   * and repeats the drawing on the canvas.
   * 
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackground();
    this.drawStatusBars();
    this.drawCharacter();
    this.drawLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawRepeat();
  }


  /**
   * 
   * Adds the background objects from the level to the map.
   * 
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }


  /**
   * 
   * Draws the status bars for energy, bottles, coins and end boss.
   * The bars are added to the map for display.
   * 
   */
  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBottles);
    this.addToMap(this.statusCoin);
    this.addToMap(this.statusEndBoss);
    this.ctx.translate(this.camera_x, 0);
  }


  /**
   * 
   * Draws the character object on the canvas.
   * 
   */
  drawCharacter() {
    this.addToMap(this.character);
  }


  /**
   * 
   * Draws the character on the canvas.
   * 
   */
  drawLevelObjects() {
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
    this.drawGameOverScreen();
    this.ctx.translate(this.camera_x, 0);
  }


  /**
   * 
   * Draws the game over screen if the character is really dead or the end boss is defeated.
   * 
   */
  drawGameOverScreen() {
    if (this.character.isRealyDead >= 10 || this.level.enemies[0].energy == 100) {
      this.addToMap(this.gameOver);
      realyGameOverCounter++;
      if (realyGameOverCounter == 200) {
        realyGameOver = true;
        realyGameOverCounter = 0;
      }
    }
  }


  drawRepeat() {
    let self = this;
    let drawAnimation = requestAnimationFrame(() => {
      if (!realyGameOver) self.draw();
    });
  }


  /********** System Fuction **********
   * 
   * Repeatedly draws the game until the game is over.
   * 
   */

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  /**
   * 
   * Adds a map object to the canvas context and flips the image if necessary.
   * 
   * @param {MapObject} mo - The map object to add to the canvas context.   
   * 
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }


  /**
   * 
   * Flips the image of a given game object horizontally.
   *
   * @param {GameObject} mo - The game object to flip.
   * 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * 
   * Restores the canvas transformation and flips the object back to its original direction.
   * 
   * @param {Object} mo - The object to flip back.
   * 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

}
