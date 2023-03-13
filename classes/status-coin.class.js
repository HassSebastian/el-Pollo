class StatusCoin extends DrawableObject {
  IMAGES_Coin = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];


  percentage = 0;


  constructor() {
    super();
    this.loadImages(this.IMAGES_Coin);
    this.x = 0;
    this.y = 100;
    this.height = 50;
    this.setPercentage(0);
  }


  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_Coin[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
