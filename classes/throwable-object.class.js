class ThrowableObject extends MovableObject {
  IMMAGES_Bottles_Rotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];


  IMMAGES_Bottles_Splash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];


  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMMAGES_Bottles_Rotation);
    this.loadImages(this.IMMAGES_Bottles_Splash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow();
    this.animate();
  }


  /**
   * 
   * Throws the object with a specific speed and applies gravity.
   * 
   */
  trow() {
    this.speedY = 30;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += 8;
    }, 25);
  }


  /**
   * 
   * Animates the bottle's throwing action and plays animation/sound based on its position
   * 
   * @returns {number} - The ID of the interval timer used to animate the bottle
   * 
   */
  animate() {
    let throwable = setStoppableInterval(() => {
      if (this.y > 300) this.playAnimation(this.IMMAGES_Bottles_Splash);
      else this.bottleThrowAnimationAndSound();
      if (this.y > 320) clearInterval(throwable);
    }, 50);
  }


  /**
   * 
   * Plays the bottle rotation animation and throw sound effect.
   * Used during the bottle throwing animation.
   * 
   */
  bottleThrowAnimationAndSound() {
    this.playAnimation(this.IMMAGES_Bottles_Rotation);
    this.throw_sound.play();
    this.throw_sound.volume = 0.2;
  }
}
