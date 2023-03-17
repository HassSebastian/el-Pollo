class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 270;
  height = 200;
  width = 150;


  /**
   * 
   * Loads an array of image paths into a cache for later use.
   *
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * 
   * Draws the image on the canvas context at the specified position and size.
   * If there is an error loading the image, a warning is logged to the console.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load,", this.img.src);
    }
  }


  /**
   * 
   * Draws a white frame around certain game objects using the provided 2D context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D context used for drawing.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chicken_smal ||
      this instanceof Endboss ||
      this instanceof Bottles ||
      this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "white";
      // ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }


  /**
   * 
   * Loads an array of image paths into a cache for later use.
   *
   * @param {string[]} arr - An array of image paths to load.
   * 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * 
   * Resolves the image index based on the current percentage value.
   * 
   * @param {number} percentage - The current percentage value.
   * @returns {number} The index number of the image to use.
   * 
   */
  resolveImageIndex() {
    if (this.percentage > 99) return 5;
    else if (this.percentage > 79) return 4;
    else if (this.percentage > 59) return 3;
    else if (this.percentage > 39) return 2;
    else if (this.percentage > 19) return 1;
    else return 0;
  }
}
