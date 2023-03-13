class Character extends MovableObject {
  height = 300;
  y = 30;
  speed = 5;
  world;
  isRealyDead = 0;
  startAnimation = false;
  idleAnimation = 0;


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
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > -615) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.walking_sound.volume = 0.2;
      }
      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        this.jump_sound.play();
        this.jump_sound.volume = 0.2;
      }
      if (this.startAnimation) {
        this.music_sound.play();
        this.music_sound.volume = 0.2;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);


    setInterval(() => {
      if (this.isDead()) {
        this.determineDeath();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_Hurt);
        this.hurt_sound.play();
        this.hurt_sound.volume = 0.2;
      } else if (this.isAboveGround() && this.startAnimation) {
        this.playAnimation(this.IMAGES_Jumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_Walking);
        this.startAnimation = true;
      }
      this.idleness();
      this.isWin();
    }, 150);

    setInterval(() => {
      this.isIdle();
      this.longIdle();
    }, 200);
  }


  determineDeath() {
    if (this.isRealyDead <= 10) {
      this.playAnimation(this.IMAGES_IsDead);
      this.isRealyDead++;
    } else {
      this.loadImage(this.IMAGES_IsDead[6]);
      this.dying_sound.play();
      this.dying_sound.volume = 0.2;
      if (realyGameOver) {
        this.dying_sound.volume = 0;
      }
    }
  }


  jump() {
    this.speedY = 30;
  }


  /**
   * 
   */
  idleness() {
    if (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.UP &&
      !this.world.keyboard.SPACE &&
      !this.isHurt() &&
      !this.isDead() &&
      !this.isAboveGround()
    ) {
      this.idleAnimation++;
    } else {
      this.idleAnimation = 0;
    }
  }


  isIdle() {
    if (this.idleAnimation >= 30) {
      this.playAnimation(this.IMAGES_Idle);
    }
  }


  longIdle() {
    if (this.idleAnimation >= 60) {
      this.playAnimation(this.IMAGES_Long_Idle);
      this.snoring_sound.play();
    }
  }


  isWin() {
    if (this.winAnimation() && !this.isAboveGround()) {
      this.jump();
      if (!realyGameOver) {
        this.win_sound.play();
      }
    }
  }
}
