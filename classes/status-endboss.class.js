class EndBoss extends DrawableObject {

    IMAGES_EndBoss = 'img/7_statusbars/2_statusbar_endboss/blue.png';

    percentage = 0;

    constructor() {
        super();
        // this.loadImage(this.IMAGES_Endboss);
        this.x = 0;
        this.y = 100;
        this.height = 50;
        // this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_Endboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


}