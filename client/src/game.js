import { App } from './app.js';




class Boot extends Phaser.Scene {
  constructor(){
    super('Boot');     
    Loader = asset => this.scene.run('Preload', asset);  
    //App.config = this.sys;
    //console.log(App.scene)
  }
  create()
  {
    //this.input.on('pointerdown', ()=> this.sys.game.destroy(true) )
  }
  init()
  {
    //this.data = data;
    this.scene.run('Preload'/* , this.data */);
    this.scene.stop('Boot');
  }
}



class Preload extends Phaser.Scene {
  constructor(){
    super('Preload');
  }
  init(/* data */)
  {
    //this.data = data;
  }
  preload()
  {
   // this.load.image('test', this.data);
  }
  create()
  {
    this.scene.run('Main'/* , this.data */);
    this.scene.stop('Preload');
  }
}



class Main extends Phaser.Scene {
  constructor(){
    super('Main');
  }
  create(/* data */)
  {
    //console.log('asset uri: ', data)
    //this.input.on('pointerdown', ()=> this.sys.game.destroy(true) )
    //this.add.image(innerWidth / 2, innerHeight / 2, 'test')

    this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(0, 0, 50, 50));
     App.scene.create = JSON.parse(`this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(0, 0, 50, 50));`)
    //App.scene.create = (square)
    //console.log(test)

    //App.scene.create = convertGameToString(this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(0, 0, 50, 50)));
  }
}

function convertGameToString(contents)
{
  console.log(JSON.stringify(`"${contents}"`))
  return `"${contents}"`
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


export function Loader(){};