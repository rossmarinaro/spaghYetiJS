import Phaser from 'phaser';



//init canvas
  let bool = false;

  const App = {
    game: null
  }

  let dataURL;
  const openFile = file =>{
      const input = file.target,
      reader = new FileReader();
      reader.onload = ()=>{
          dataURL = reader.result //,
          //output = document.getElementById('output');
          //output.src = dataURL;
          console.log(dataURL)
      }
      reader.readAsDataURL(input.files[0])
  }


   

     document.getElementById('form-submit').addEventListener('click', e => {

      e.preventDefault();
      e.stopPropagation();
      if (App.game !== null)
        return;

      App.game = new Phaser.Game(new Config(document.getElementById('game-width-bar').value, document.getElementById('game-height-bar').value));

      
    });

    document.getElementById('reset-canvas').addEventListener('click', e =>{ 
      e.preventDefault();
      e.stopPropagation();
      App.game.destroy(true);
      App.game = null;
      
    });



  

    class Main extends Phaser.Scene {
      constructor(){
        super('Main');
      }
      create()
      {
        //this.input.on('pointerdown', ()=> this.sys.game.destroy(true) )
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
          this.scene = [Main];
          this.physics = {
            default: 'arcade',
            arcade: {
              debug: false,
              gravity: { y: 300 }
            }
          }
        
      }
    }


    App.game = new Phaser.Game(new Config(200, 200));


