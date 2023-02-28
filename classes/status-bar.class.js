class StatusBar extends DrawableObject {


    IMAGES_Helth = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png'
    ];


    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_Helth);
        this.x = 0;
        this.y = 0;
        this.height = 50;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_Helth[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

}
