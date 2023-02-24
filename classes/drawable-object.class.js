class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 270;
    height = 200;
    width = 150;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load,', this.img.src);
        }
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chicken_smal || this instanceof Endboss || this instanceof Bottles || this instanceof Coins){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'white';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}