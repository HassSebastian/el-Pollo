class StartScreen extends MovableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    IMMAGE_StartScreen = 'img/9_intro_outro_screens/start/startscreen_1.png';

    constructor() {
        super();
        this.loadImage(this.IMMAGE_StartScreen());
    }



}