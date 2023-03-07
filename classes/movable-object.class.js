class MovableObject extends DrawableObject {
    speed = .15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 0;
    lastHit = 0;
    salsa_bottles = 0;
    coin = 0;
    deadEnemy = -1;

    constructor() {
        super();
        this.start();
    }

    start() {
        setTimeout(this.clearDeadEnemy, 1000);
    }



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
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
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
        const index = world.level.coins.findIndex(item => item.x === coinsx);
        this.world.level.coins.splice(index, 1);
        this.coin += 10;

    }

    collisionWithBottles(bottles) {
        if (this.salsa_bottles <= 100) {
            console.log(this.salsa_bottles);
            let bottlesx = bottles.x;
            const index = world.level.bottles.findIndex(item => item.x === bottlesx);
            this.world.level.bottles.splice(index, 1);
            this.salsa_bottles += 10;
        };
    }

    isCollidingFromUp(enemy) {
        let enemyx = enemy.x;
        let index = world.level.enemies.findIndex(item => item.x === enemyx);
        world.level.enemies[index].speed = 0;
        world.level.enemies[index].isDead = true;
    }

    clearDeadEnemy() {
        setInterval(() => {
            for (let i = 0; i < world.level.enemies.length; i++) {
                if (world.level.enemies[i].isDead == true) {
                    world.level.enemies.splice(i, 1);
                    break;
                }
            }
        }, 3000);
    }

    clearBottles() {
        world.th
    }

}

