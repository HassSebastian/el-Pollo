class StautusBottles extends DrawableObject {

    IMAGES_Bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];


    salsa_bottles = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES_Bottle);
        this.x = 0;
        this.y = 50;
        this.height = 50;
        this.includesBottles(0);

    }

    includesBottles(salsa_bottles) {
        this.salsa_bottles = salsa_bottles;
        let path = this.IMAGES_Bottle[this.resolveImageIndexBottles()];
        this.img = this.imageCache[path];
    }


    resolveImageIndexBottles() {
        if (this.salsa_bottles == 0) {
            return 0;
        } else if (this.salsa_bottles >= 10) {
            return 5;
        } else if (this.salsa_bottles >= 8) {
            return 4;
        } else if (this.salsa_bottles >= 6) {
            return 3;
        } else if (this.salsa_bottles >= 4) {
            return 2;
        } else {
            return 1;
        }
    }

}