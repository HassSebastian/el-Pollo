class StautusBottles extends DrawableObject {
  IMAGES_Bottle = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];


  percentage = 0;


  constructor() {
    super();
    this.loadImages(this.IMAGES_Bottle);
    this.x = 0;
    this.y = 50;
    this.height = 50;
    this.setPercentage(0);
  }


  /**
   * 
   * Sets the health percentage of the object and updates its image.
   * 
   * @param {number} percentage - The new health percentage value.
   * 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_Bottle[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
