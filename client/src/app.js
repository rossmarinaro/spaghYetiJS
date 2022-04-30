  import Phaser from 'phaser';

  import { Config } from './game.js';
  import { Ajax } from './ajax.js';





//-------- Main Application

    export const App = {
        
        preload: file => {
          if (file.type && !file.type.startsWith('image/'))
          {
            console.log('File is not an image', file.type, file);
            return;
          }
  
          const img = document.createElement('img');
          document.getElementById('output').appendChild(img);
          App.fileReader.addEventListener('load', e => { 
              img.src = e.target.result;
              typeof Loader === 'function' ? Loader(img.src) : alert('please create a canvas first');
          });

        },
        game: null,
        scene: {
          init: null,
          preload: null,
          create: null,
          update: null
        },
        config: null,
        ajax: new Ajax,
        fileReader: new FileReader()
      }

    

      //------------------ open asset

    
      document.getElementById('load-asset-bar').addEventListener('change', e => {
        //console.log('onChange:', e)
        App.fileReader.readAsDataURL(e.target.files[0]);
        App.preload(e.target.files[0]);

      });

      //--------------------- make canvas


      let makeCanvas = 0;

      document.getElementById('make-canvas').addEventListener('click', e => {

        e.preventDefault();
        e.stopPropagation();

        if (App.game !== null || makeCanvas === 1)
          return;

        makeCanvas++;
        makeCanvas = 0;


      //// creates canvas

        const config = new Config(
          document.getElementById('game-width-bar').value, 
          document.getElementById('game-height-bar').value  
        );

        App.config = config;
         
      });

      //------------------------ reset canvas

      document.getElementById('reset-canvas').addEventListener('click', e =>{ 

        e.preventDefault();
        e.stopPropagation();

        if (App.game === null)
          return;

        App.game.destroy(true);
        App.game = null;

      });

      //--------------------------- build project

      
      document.getElementById('build-project').addEventListener('click', e =>{ 
        
        e.preventDefault();
        e.stopPropagation();

        if (App.game === null)
          return;

          
          const game = JSON.stringify({
            config: App.config,
            scene: App.scene
          });

          fetch('/buildProject', App.ajax.request('POST', game))
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(e => console.log(e))
      });
                    
            
      
    //--------------------------------- run test
  
      
      document.getElementById('test-input').addEventListener('click', e =>{ 
        
          e.preventDefault();
          e.stopPropagation();

          runGame(); 
        
     
      });


    //--------------------------------- 
  
      
        document.getElementById('add-square').addEventListener('click', e =>{ 
      
          e.preventDefault();
          e.stopPropagation();

          App.scene.create = `this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(100, 100, 50, 50));`;
        
      
      });
                      
              

    //----------------------------- run game

    function runGame()
    {
      if (App.config !== null && App.game === null)
       App.game = new Phaser.Game(App.config);
    }