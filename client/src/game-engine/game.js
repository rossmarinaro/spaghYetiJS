import { app } from './index.js'



class Boot extends Phaser.Scene {

  constructor(){

    super('Boot');     
  }
  init()
  {
    this.data = app.scene.create.toString();
    this.scene.run('Preload', this.data);
    this.scene.stop('Boot');
  }
}



class Preload extends Phaser.Scene {

  constructor(){

    super('Preload');
  }
  init(data)
  {
    this.data = data;
  }
  preload()
  {
   // this.load.image('test', this.data);
  }
  create()
  {
    this.scene.run('Main', this.data);
    this.scene.stop('Preload');
  }
}





class Main extends Phaser.Scene {

  constructor(){

    super('Main');
  }
  create(data)
  {
    /* evaluate data string inputs from main application */ 
    eval(data);
    
  }
}



export class Config {

  constructor(width, height)
  {

    this.type = Phaser.AUTO;
    this.backgroundColor = '#000000';
    this.scale = {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width,
      height: height
    };
    this.parent = 'game',
    this.dom = {
          createContainer: true
    };
    this.scene = [Boot, Preload, Main];
    this.physics = {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 300 }
      }
    }
  }
}
