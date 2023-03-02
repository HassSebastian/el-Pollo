class MovableObject extends DrawableObject {
    speed = .15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 0;
    lastHit = 0;
    salsa_bottles = 0;
    coin = 0;
    isRealyDead = 0;



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

    collectingSalsa_bottles() {

        this.salsa_bottles += 10;
    }

    collectingCoins() {
        this.coin += 10;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}

