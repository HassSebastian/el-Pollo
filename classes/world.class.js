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
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThroObjects();
    }, 300);
  }

  checkThroObjects() {
    // flasche werfen
    if (this.keyboard.SPACE && this.statusBottles.percentage >= 10) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.statusBottles.percentage -= 10;
      this.character.salsa_bottles -= 10;
      this.statusBottles.setPercentage(this.statusBottles.percentage);
    }
    // geworfene flasche löschen
    if (this.throwableObject.length >= 1) {
      if (this.throwableObject[0].y > 300) {
        this.throwableObject.splice(0, 1);
      }
    }
  }

  checkCollision() {
    // zusammenstoß mit einem enemy beim laufen
    this.level.enemies.forEach((enemy) => {
      if (
        (this.character.isColliding(enemy) &&
          !this.character.isAboveGround() &&
          !enemy.deadEnemy) ||
        // springen auf Boss verboten
        (this.character.isColliding(enemy) &&
          !this.character.isAboveGround() &&
          !this.level.enemies[0])
      ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
      // springen auf ein enemy
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() /*&&
        !this.level.enemies[0]*/
      ) {
        this.character.isCollidingFromUp(enemy);
      }
    });
    // flaschen einsammeln
    this.level.bottles.forEach((bottles) => {
      if (this.character.isColliding(bottles)) {
        this.statusBottles.setPercentage(this.character.salsa_bottles);
        this.character.collisionWithBottles(bottles);
      }
    });
    // coins einsammeln
    this.level.coins.forEach((coins) => {
      if (this.character.isColliding(coins)) {
        this.statusCoin.setPercentage(this.character.coin);
        this.character.collisionWithCoin(coins);
      }
    });
    // Endbossschaden durch flasche
    this.throwableObject.forEach((bottle) => {
      if (this.level.enemies[0].isColliding(bottle)) {
        this.level.enemies[0].hit();
        this.throwableObject.slice(bottle, 1);
        this.statusEndBoss.setPercentage(this.level.enemies[0].energy);
      }
    });
  }

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

  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBottles);
    this.addToMap(this.statusCoin);
    this.addToMap(this.statusEndBoss);
    this.ctx.translate(this.camera_x, 0);
  }

  drawCharacter() {
    this.addToMap(this.character);
  }

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
      if (!realyGameOver)
        self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

}
