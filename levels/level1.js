let level1;

function initLevel() {

  level1 = new Level(
    [
      new Endboss(),
      new Chicken(),
      new Chicken_smal(),
      new Chicken(),
      new Chicken_smal(),
      new Chicken(),
      new Chicken_smal(),
      new Chicken(),
      new Chicken_smal(),
      new Chicken(),
      new Chicken_smal(),
    ],

    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud_different(),
      new Cloud_different(),
      new Cloud_different(),
      new Cloud_different()
    ],

    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 1437),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1437),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1437),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1437),
      new BackgroundObject("img/5_background/layers/air.png", 2156),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2156),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2156),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2156)
    ],

    [
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles()
    ],

    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins()
    ],
    // [
    //   new Audio("audio/music.mp3"),
    //   new Audio("audio/collect-coins.mp3"),
    //   new Audio("audio/bottles.mp3"),
    //   new Audio("audio/hurt.mp3"),
    //   new Audio("audio/walking.mp3"),
    //   new Audio("audio/jump.mp3"),
    //   new Audio("audio/win.mp3"),
    //   new Audio("audio/chicken.mp3"),
    //   new Audio("audio/throw.mp3"),
    //   new Audio("audio/dying.mp3"),
    //   new Audio("audio/hitChicken.mp3"),
    //   new Audio("audio/spawn_endboss.mp3"),
    //   new Audio("audio/hit_endboss.mp3"),
    //   new Audio("audio/snoring.mp3")
    // ]
  );
}
