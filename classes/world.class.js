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
    throwableObject = [];
    bottles = new Bottles();
    coins = new Coins();


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
        }, 200);
    }

    checkThroObjects() {
        if (this.keyboard.SPACE && this.statusBottles.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.statusBottles.percentage -= 10;
            this.statusBottles.setPercentage(this.statusBottles.percentage);
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            };
        });

        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                this.character.collectingSalsa_bottles();
                this.statusBottles.setPercentage(this.character.salsa_bottles);
                this.collisionWithBottles(bottles);
            };
        });

        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.character.collectingCoins();
                this.statusCoin.setPercentage(this.character.coin);
                this.collisionWithCoin(coins);
            }
        });
    }

    collisionWithCoin(coins) {
        let coinsx = coins.x;
        const index = world.level.coins.findIndex(item => item.x === coinsx);
        this.level.coins.splice(index, 1);
    }

    collisionWithBottles(bottles) {
        let bottlesx = bottles.x;
        const index = world.level.bottles.findIndex(item => item.x === bottlesx);
        this.level.bottles.splice(index, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBottles);
        this.addToMap(this.statusCoin);
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