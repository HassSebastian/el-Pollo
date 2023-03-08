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
    statusEndboss = new EndBoss();
    throwableObject = [];
    bottles = new Bottles();
    coins = new Coins();
    chicken = new Chicken();
    endboss = new Endboss();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
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
        if (this.keyboard.SPACE && this.statusBottles.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            // this.statusBottles.percentage -= 10;
            this.statusBottles.salsa_bottles -= 10;
            this.statusBottles.setPercentage(this.statusBottles.percentage);
        }
        if (this.throwableObject.length >= 1) {
            if (this.throwableObject[0].y > 300) {
                this.throwableObject.splice(0, 1);
            };
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
                this.character.isCollidingFromUp(enemy);
            };
        });

        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                this.statusBottles.setPercentage(this.character.salsa_bottles);
                this.character.collisionWithBottles(bottles);
            };
        });

        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.statusCoin.setPercentage(this.character.coin);
                this.character.collisionWithCoin(coins);
            }
        });

        this.throwableObject.forEach((bottle) => {
            if(this.endboss.isColliding(bottle)) {
                this.endboss.bossHit += 1;
                this.endboss.firstBossHit = true;
                this.throwableObject.slice(bottle,1);
            }
        })


    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBottles);
        this.addToMap(this.statusCoin);
        // this.addToMap(this.statusEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
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