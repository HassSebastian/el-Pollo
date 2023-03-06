class Chicken extends MovableObject {

    y = 370;
    height = 90;
    width = 90;
    isDead = false;


    IMAGES_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMMAGE_Die = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    walking_sound = new Audio('audio/chicken.mp3');
 

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_Walking);
        this.loadImage(this.IMMAGE_Die);

        this.x = 200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * .25;

        this.animate();

    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            //            this.walking_sound.play();
            this.walking_sound.volume = 0.2;
        }, 1000);

        setInterval(() => {
            this.playAnimation(this.IMAGES_Walking);
            if(this.isDead){
                this.loadImage(this.IMMAGE_Die);
            }
        }, 100);
    }

}