class Cloud_different extends MovableObject {
    y = 60;
    height = 200;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');

        this.x = Math.random() * 2500;
        this.animate();


    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}