class GameOver extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    IMAGE_GameOver = 'img/9_intro_outro_screens/game_over/you lost.png';


    constructor(){
        super();
        // this.isGameOver();
    }

    isGameOver(){
        if(this.isHurt()){
        this.loadImage(this.IMAGE_GameOver);
        }
    }


}