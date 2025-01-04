import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', './assets/background.png');
        this.load.image('location', './assets/Btn1.png');
        this.load.image('rvsp', './assets/Btn2.png');
        this.load.image('obj1', './assets/Obj1.png');
        this.load.image('obj2', './assets/Obj2.png');
        this.load.image('title1', './assets/Title1.png');
        this.load.image('title2', './assets/Title2.png'); 
        this.load.image('title4', './assets/Title4.png');
        this.load.image('title5', './assets/Title5.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
