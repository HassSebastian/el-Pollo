const level1 = new Level(
    [
        new Chicken(),
        new Chicken_smal(),
        new Endboss(),
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud_different(),
        new Cloud_different(),
        new Cloud_different(),
        new Cloud_different(),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 1437),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1437),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1437),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1437),
        new BackgroundObject('img/5_background/layers/air.png', 2156),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2156),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2156),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2156)
    ]
);