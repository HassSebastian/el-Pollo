class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  /*audio;*/
  level_end_x = 2250;


  constructor(enemies, clouds, backgroundObjects, bottles, coins, /*audio*/) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
    // this.audio = audio
  }
}
