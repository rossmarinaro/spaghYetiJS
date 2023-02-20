import { App } from './app';
import Phaser from 'phaser';


class Boot extends Phaser.Scene {

  constructor(){

    super('Boot');     
  }
  private init(): void
  {
    this.data = App.scene.create.toString();
    this.scene.run('Preload', this.data);
    this.scene.stop('Boot');
  }
}



class Preload extends Phaser.Scene {

  constructor(){

    super('Preload');
  }
  private init(data: Phaser.Data.DataManager): void
  {
    this.data = data;
  }
  private preload(): void
  {
   // this.load.image('test', this.data);
  }
  private create(): void
  {
    this.scene.run('Main', this.data);
    this.scene.stop('Preload');
  }
}



//----------- main scene

class Main extends Phaser.Scene {

  constructor(){

    super('Main');
  }
  private create(dataAsstring: string): void
  {

    /* evaluate data string inputs from main application */ 
    
    eval(dataAsstring);
    
  }
}

//-------------------------- base config

export class Config {

  public type: any
  public backgroundColor: string
  public scale: any
  public parent: string
  public dom: any
  public scene: any;
  public physics: any

  constructor(width: number, height: number)
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
