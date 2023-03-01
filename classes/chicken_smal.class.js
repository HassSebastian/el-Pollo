class Chicken_smal extends MovableObject {

    y = 400;
    height = 60;
    width = 60;
    IMAGES_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_Walking);

        this.x = 200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * .25;

        this.animate();

    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(!this.isDie){
            this.playAnimation(this.IMAGES_Walking);
            }else{
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
        }, 100);

    }












}