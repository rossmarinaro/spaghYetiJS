import Phaser from 'phaser';
import './style.css';

//import 'regenerator-runtime/runtime';

   

    let test;
    class Boot extends Phaser.Scene {
      constructor(){
        super('Boot');     
        test = asset => this.scene.run('Preload', asset);  
      }

      // init(data)
      // {
      //   this.data = data;
      //   this.scene.run('Preload', this.data);
      //   this.scene.stop('Boot');
      // }
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
      {console.log('ok', data)
        //this.input.on('pointerdown', ()=> this.sys.game.destroy(true) )
        this.add.image(innerWidth / 2, innerHeight / 2, 'test')
      }
    }





    class Config {

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




//-----------------------------------



        let reader = new FileReader();

        document.getElementById('load-asset-bar').addEventListener('change', e => {
          //console.log('onChange:', e)
          reader.readAsDataURL(e.target.files[0]);
          App.preload(e.target.files[0]);
        });



        document.getElementById('form-submit').addEventListener('click', e => {

          e.preventDefault();
          e.stopPropagation();
          if (App.game !== null)
            return;

          App.game = new Phaser.Game(
              new Config(
                document.getElementById('game-width-bar').value, 
                document.getElementById('game-height-bar').value
              )
          );


        });

        document.getElementById('reset-canvas').addEventListener('click', e =>{ 
          e.preventDefault();
          e.stopPropagation();
          if (App.game === null)
            return;
          App.game.destroy(true);
          App.game = null;

        });





    const App = {
      preload: file => {
        if (file.type && !file.type.startsWith('image/'))
        {
          console.log('File is not an image', file.type, file);
          return;
        }

        const img = document.createElement('img');
        document.getElementById('output').appendChild(img);

        reader.addEventListener('load', e => { 
          //console.log('loaded: ', e); 
            img.src = e.target.result;
            typeof test === 'function' ? test(img.src) : alert('please create a canvas first');
        });
      },
      game: null
    }
  //  App.game = new Phaser.Game(new Config(200, 200));


