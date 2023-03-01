class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -10;

    IMAGES_Walking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_Attack = [
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        'img/4_enemie_boss_chicken/2_alert/G14.png',
        'img/4_enemie_boss_chicken/2_alert/G15.png',
        'img/4_enemie_boss_chicken/2_alert/G16.png',
        'img/4_enemie_boss_chicken/2_alert/G17.png',
        'img/4_enemie_boss_chicken/2_alert/G18.png',
        'img/4_enemie_boss_chicken/2_alert/G19.png',
        'img/4_enemie_boss_chicken/2_alert/G20.png'
    ];
    IMAGES_Hurt = [
        'img/4_enemie_boss_chicken/2_alert/G21.png',
        'img/4_enemie_boss_chicken/2_alert/G22.png',
        'img/4_enemie_boss_chicken/2_alert/G23.png'
    ];

    IMAGES_Dead = [

        'img/4_enemie_boss_chicken/2_alert/G24.png',
        'img/4_enemie_boss_chicken/2_alert/G25.png',
        'img/4_enemie_boss_chicken/2_alert/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_Walking[0]);
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Attack);
        this.loadImages(this.IMAGES_Hurt);
        this.loadImages(this.IMAGES_Dead);
        this.x = 2500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isWalking()){
            this.playAnimation(this.IMAGES_Walking);
            }else if (this.isAttack()){
                this.playAnimation(this.IMAGES_Attack);
            }else if (this.isHurt()){
                this.playAnimation(this.IMAGES_Hurt);
            }else if (this.isDead()){
                this.playAnimation(this.IMAGES_Dead);
            }
        }, 200);
    }
}