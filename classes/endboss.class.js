class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -10;
    isDead = false;
    firstBossHit = false;
    bossHit = 0;


    IMAGES_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_Attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_Dead = [

        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Alert);
        this.loadImages(this.IMAGES_Attack);
        this.loadImages(this.IMAGES_Hurt);
        this.loadImages(this.IMAGES_Dead);
        this.x = 500; //2500
        this.animate();
    }

    animate() {
        setInterval(() => {

            // this.firstHit();
            if(!this.firstBossHit){
                this.playAnimation(this.IMAGES_Walking);
            }else{
                this.playAnimation(this.IMAGES_Attack);
                console.log(this.firstBossHit);

            };

            
        }, 200);
    }

    firstHit() {
        if (this.bossHit > 0) {
            return this.firstBossHit = true;
        }
    }

    // chill() {

    //     this.playAnimation(this.IMAGES_Alert);
    // }
    // attack() {
    //     this.playAnimation(this.IMAGES_Dead);

    // }
}