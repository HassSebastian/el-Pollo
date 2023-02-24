class StatusCoin extends DrawableObject {

    IMAGES_Coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    coin = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES_Coin);
        this.x = 0;
        this.y = 100;
        this.height = 50;
        this.setincludesCoin(0);
    }

    setincludesCoin(coin) {
        this.coin = coin;
        let path = this.IMAGES_Coin[this.resolveImageIndexCoin()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexCoin() {
        if (this.coin == 0) {
            return 0;
        } else if (this.coin >= 10) {
            return 5;
        } else if (this.coin >= 8) {
            return 4;
        } else if (this.coin >= 6) {
            return 3;
        } else if (this.coin >= 4) {
            return 2;
        } else {
            return 1;
        }
    }

}