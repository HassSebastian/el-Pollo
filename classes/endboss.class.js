class Endboss extends MovableObject {
  height = 300;
  width = 200;
  y = 140;


  IMAGES_Walking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];


  IMAGES_Alert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];


  IMAGES_Attack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];


  IMAGES_Hurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];


  IMAGES_Dead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];


  constructor() {
    super();
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_Alert);
    this.loadImages(this.IMAGES_Attack);
    this.loadImages(this.IMAGES_Hurt);
    this.loadImages(this.IMAGES_Dead);
    this.x = 2500;
    this.animate();
    this.speed = 4;
  }


  /**
   * 
   * Animates the character during a fight sequence.
   *
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isDead()) this.isDeadInFight();
      else if (this.isHurt()) this.isHurtInFight();
      else if (this.energy > 0) this.contactWithCharacter();
      else this.playAnimation(this.IMAGES_Alert);
    }, 100);
  }


  /**
   * 
   * Stops the character's movement and plays the dead animation.
   *
   */
  isDeadInFight() {
    this.speed = 0;
    this.playAnimation(this.IMAGES_Dead);
  }


  /**
   * 
   * Plays the hurt animation and ends the boss hit sound (if not already dead).
   *
   */
  isHurtInFight() {
    this.playAnimation(this.IMAGES_Hurt);
    if (!this.isRealyDead) this.endBossHitSound();
  }


  /**
   * 
   * play hit sound
   * 
   */
  endBossHitSound() {
    this.hitBoss_sound.play();
    this.hitBoss_sound.volume = 0.2;
  }


  /**
   * 
   * Handles the boss's behavior when in contact with the character.
   *
   */
  contactWithCharacter() {
    if (this.characterIsDead()) this.winWalk();
    else if (this.diffrentBossToCharacter() < -20) this.turnAndFight();
    else if (this.diffrentBossToCharacter() < 250) this.fastAttack();
    else if (this.diffrentBossToCharacter() <= 400) this.relaxToFight();
    else if (this.diffrentBossToCharacter() > 400) this.relaxAndWalk();
  }


  /**
   * 
   * Sets the boss's speed to 15, moves it right, 
   * changes its direction, 
   * and plays the walking animation.
   * 
   */
  winWalk() {
    this.speed = 15;
    this.moveRight();
    this.otherDirection = true;
    this.playAnimation(this.IMAGES_Walking);
  }


  /**
   * 
   * Plays the attack animation, sets the boss's speed to 25, 
   * moves it right, changes its direction, 
   * and plays the spawnBoss sound (if not already dead)
   * 
   */
  turnAndFight() {
    this.playAnimation(this.IMAGES_Attack);
    this.moveRight();
    this.speed = 25;
    this.otherDirection = true;
    if (!this.isRealyDead) this.spawnBoss_sound.play();
  }


  /**
   * 
   * Plays the attack animation, sets the boss's speed to 15, 
   * moves it left, changes its direction, 
   * and plays the spawnBoss sound (if not already dead).
   * 
   */
  fastAttack() {
    this.playAnimation(this.IMAGES_Attack);
    this.moveLeft();
    this.speed = 15;
    this.otherDirection = false;
    if (!this.isRealyDead) this.spawnBoss_sound.play();
  }


  /**
   * 
   * Plays the walking animation and moves the boss left.
   * 
   */
  relaxToFight() {
    this.playAnimation(this.IMAGES_Walking);
    this.moveLeft();
  }


  /**
   * 
   * Plays the walking animation, sets the boss's speed to 4, 
   * and moves it left. 
   * 
   */
  relaxAndWalk() {
    this.playAnimation(this.IMAGES_Walking);
    this.moveLeft();
    this.speed = 4;
  }
}
