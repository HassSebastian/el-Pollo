class Character extends MovableObject {
  height = 300;
  y = 30;
  speed = 5;
  world;
  startAnimation = false;
  idleAnimation = 0;

  offset = {
    top: 100,
    left: 20,
    right: 20,
    bottom: 0
  };


  IMAGES_Idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];


  IMAGES_Long_Idle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];


  IMAGES_Walking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];


  IMAGES_Jumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];


  IMAGES_IsDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];


  IMAGES_Hurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];


  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_Idle);
    this.loadImages(this.IMAGES_Long_Idle);
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_Jumping);
    this.loadImages(this.IMAGES_IsDead);
    this.loadImages(this.IMAGES_Hurt);
    this.applyGravity();
    this.animate();
  }


  animate() {
    setStoppableInterval(() => {
      this.pepeMove();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.musicStart();
      this.pepePsyche();
      this.idleness();
      this.isWin();
      this.isIdle();
      this.longIdle();
    }, 150);
  }


  /**
   * 
   * moves the character when pressing a key
   * 
   */
  pepeMove() {
    audioFiles[4].pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.moveRight();
    if (this.world.keyboard.LEFT && this.x > -615) this.moveLeftAndSound();
    if (this.world.keyboard.UP && !this.isAboveGround()) this.jumpAndSound();
    this.world.camera_x = -this.x + 100;
  }


  /**
   * 
   * plays an animation depending on the psyche
   * 
   */
  pepePsyche() {
    if (this.isDead()) this.determineDeath();
    else if (this.isHurt()) this.pepeHurt();
    else if (this.isAboveGround() && this.startAnimation) this.playAnimation(this.IMAGES_Jumping);
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_Walking);
      this.startAnimation = true;
    }
  }


  musicStart() {
    if (!this.isRealyDead) {
      audioFiles[0].play();
      audioFiles[0].volume = .2;
      audioFiles[7].play();
      audioFiles[7].volume = .05;
    }
  }


  /**
   *
   * sets a counter to the game over animation
   *  
   */
  determineDeath() {
    if (this.isRealyDead <= 10) {
      this.playAnimation(this.IMAGES_IsDead);
      this.isRealyDead++;
    } else {
      this.loadImage(this.IMAGES_IsDead[6]);
      if (!this.isRealyDead) this.pepeDyingSound();
    }
  }


  /**
   * 
   * Plays the hurt animation and triggers the pepeHurtSound, 
   * if the boss is not really dead.
   * 
   */
  pepeHurt() {
    this.playAnimation(this.IMAGES_Hurt);
    if (!this.isRealyDead) this.pepeHurtSound();
  }


  /**
   * 
   * Plays the hurt_sound with a volume of 0.2.
   * 
   */
  pepeHurtSound() {
    audioFiles[3].play();
    audioFiles[3].volume = .2;
  }


  /**
   * 
   * Moves the boss to the left and triggers the pepeWalkSound, 
   * if the boss is not really dead.
   * 
   */
  moveLeftAndSound() {
    this.moveLeft();
    this.otherDirection = true;
    if (!this.isRealyDead) this.pepeWalkSound();
  }


  /**
   * 
   *  Plays the walking_sound with a volume of 0.2.
   * 
   */
  pepeWalkSound() {
    audioFiles[4].play();
    audioFiles[4].volume = .2;
  }


  /**
   * 
   * Makes the boss jump and triggers the pepeJumpSound, if the boss is not really dead.
   * 
   */
  jumpAndSound() {
    this.jump();
    if (!this.isRealyDead) this.pepeJumpSound();
  }


  /**
   * 
   * Plays the jump_sound with a volume of 0.2.
   * 
   */
  pepeJumpSound() {
    audioFiles[5].play();
    audioFiles[5].volume = .2;
  }


  /**
   * 
   * Plays the dying_sound with a volume of 0.2.
   * 
   */
  pepeDyingSound() {
    audioFiles[9].play();
    audioFiles[9].volume = .2;
  }


  /**
   * 
   * Makes the boss character jump by setting its vertical speed to 30.
   * 
   */
  jump() {
    this.speedY = 30;
  }


  /**
   * 
   * If the character is idle, it will update the idleGroundPosition and idleAnimation properties.
   * Otherwise, it will reset the idleAnimation property to 0.
   * 
   */
  idleness() {
    if (this.pepeIdleness()) {
      this.idleGroundPosition();
      this.idleAnimation++;
    } else this.idleAnimation = 0;
  }


  /**
   * Checks if Pepe is currently idle based on keyboard input and his current state.
   *
   * @returns {boolean} True if Pepe is idle, false otherwise.
   * 
   */
  pepeIdleness() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE && !this.isHurt() && !this.isDead() && !this.isAboveGround();
  }


  /**
   * 
   * Loads the image for the ground idle position if the idle animation has been running for less than 30 frames.
   * 
   */
  idleGroundPosition() {
    if (this.idleAnimation <= 2) this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
  }


  /**
   * 
   * Checks if the idle animation has been running for at least 30 frames and plays the idle animation if so.
   * 
   */
  isIdle() {
    if (this.idleAnimation > 2 && !this.isHurt()) this.playAnimation(this.IMAGES_Idle);
  }


  /**
   * 
   * Plays a long idle animation and snoring sound if the idle animation has been running for at least 60 frames.
   * 
   */
  longIdle() {
    if (this.idleAnimation >= 30) {
      this.playAnimation(this.IMAGES_Long_Idle);
      if (!this.isRealyDead) audioFiles[13].play();
    }
  }


  /**
   * 
   * plays the win animation and sound
   * 
   */
  isWin() {
    if (this.winAnimation() && !this.isAboveGround()) {
      this.jump();
      if (!realyGameOver) audioFiles[6].play();
    }
  }
}
