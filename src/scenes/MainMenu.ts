import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    //#region Pre
    prologue: GameObjects.Text;
    hidePrologue: boolean = false;
    //#endregion
    
    background: GameObjects.tileSprite;
    subBackground: GameObjects.rectangle;
     
    //#region Elements
    locationBtn: GameObjects.Image;
    rsvpBtn: GameObjects.Image;
    obj1: GameObjects.Image;
    obj2: GameObjects.Image; 
    title1: GameObjects.Image;
    title2: GameObjects.Image;
    title4: GameObjects.Image;
    title5: GameObjects.Image;
    
    remainingTime: GameObjects.Text;
    targetDate:any;
    canCountDown: boolean = false;
    //#endregion

    constructor () {
        super('MainMenu');
    }

    create () {
        this.background = this.add.tileSprite(
            this.sys.canvas.width/2,
            this.sys.canvas.height/2,
            this.sys.canvas.width,
            this.sys.canvas.height, "background");

        this.prologue = this.add.text(
            this.sys.game.canvas.width/2,
            this.sys.game.canvas.height,
            'Psst! \n te tengo una sorpesa...', {
                fontFamily: 'Arial Black',
                fontSize: this.sys.game.canvas.height*0.02,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5); 

        this.input.on('pointerdown', () => {
            if(this.hidePrologue) return;
            this.hidePrologue = true;
            this.prologue.destroy();
            this.showContent();
        });
    }

    update () {
        this.background.tilePositionX += 0.5;
        if(this.prologue.y > this.sys.canvas.height*0.5){
            this.prologue.y -= 1*25;
        }

        if(this.canCountDown){
            const now = new Date();
            const timeRemaining = this.targetDate - now;

        
            if(timeRemaining <=0){
                this.remainingTime.setText('ES HOY!!!');
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); 
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

           this.remainingTime.setText(`${days} días y ${hours} h, ${minutes} m y ${seconds} s`);   
        } 
    }

    showContent(){
        console.log('show content');
        this.subBackground = this.add.rectangle(
            this.sys.canvas.width/2,
            this.sys.canvas.height/2, 
            this.sys.canvas.width*0.95, 
            this.sys.canvas.height*0.95,
            0x000000, 0.5).setOrigin(0.5);

        this.locationBtn = this.add.image(this.sys.canvas.width*0.6,this.sys.canvas.height*0.7, 'location').setScale(0.3);
        this.rsvpBtn = this.add.image(this.sys.canvas.width*0.7,this.sys.canvas.height*0.8, 'rvsp').setScale(0.3);

        this.obj1 = this.add.image(this.sys.canvas.width*0.1,this.sys.canvas.height*0.9, 'obj1').setScale(0.4);

        this.obj2 = this.add.image(this.sys.canvas.width/2,(this.sys.canvas.height/2)-170, 'obj2').setScale(0.4);

        this.title1 = this.add.image(this.sys.canvas.width*0.5,this.sys.canvas.height*0.1, 'title1').setScale(0.3);

        this.title2 = this.add.image(this.sys.canvas.width*0.5,this.sys.canvas.height*0.2, 'title2').setScale(0.4);

        this.title4 = this.add.image(this.sys.canvas.width*0.5,this.sys.canvas.height*0.5, 'title4').setScale(0.4);

        this.title5 = this.add.image(this.sys.canvas.width*0.65,this.sys.canvas.height*0.95, 'title5').setScale(0.5);

            //Y-M-D
        this.targetDate = new Date("2024-12-27T00:00:00");

        this.remainingTime = this.add.text(
            this.sys.canvas.width/2,
            (this.sys.canvas.height/2)+100 ,'00:00:00', {
            fontFamily: 'Arial Black',
            fontSize: this.sys.game.canvas.height*0.02,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);
 
        //LOCATION DATA
        this.locationBtn.setInteractive();        
        this.locationBtn.on('pointerdown', () => {
            console.log('location');
            //open a link
            //if browser is any but safari
            if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
                console.log('safari');
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.style.display = 'none';
                a.href = 'https://maps.app.goo.gl/H2RAY957LwUr1iUdA';
                setTimeout(() => {
                    a.click();
                    document.body.removeChild(a);
                }, 1000); 
                return;
            } else {
                window.open('https://maps.app.goo.gl/H2RAY957LwUr1iUdA');
            } 
        });

        //RVSP DATA
        this.rsvpBtn.setInteractive();
        let phone = '5652676495';
        let message = 'Hola, asistire al cumpleaños de tu hija Paulina! Nos vemos';

        this.rsvpBtn.on('pointerdown', () => {
            console.log('rsvp');
            if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){ 
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.style.display = 'none';
                a.href = `https://wa.me/${phone}?text=${message.replace(' ', '%20')}`;
                setTimeout(() => {
                    a.click();
                    document.body.removeChild(a);
                }, 1000); 
                return;
            } else {
                window.open(`https://wa.me/${phone}?text=${message.replace(' ', '%20')}`);
            } 
        });

        this.canCountDown = true;
    }
}