  import Phaser from 'phaser';
  import './style.css';

  //import 'regenerator-runtime/runtime';
  import { App } from './app.js';
  import { Config } from './game.js';


      //------------------ open asset

    
        document.getElementById('load-asset-bar').addEventListener('change', e => {
          //console.log('onChange:', e)
          App.fileReader.readAsDataURL(e.target.files[0]);
          App.preload(e.target.files[0]);

        });

        //--------------------- make canvas

        document.getElementById('form-submit').addEventListener('click', e => {

          e.preventDefault();
          e.stopPropagation();
          if (App.game !== null)
            return;

        //// creates canvas

          const config = new Config(
            document.getElementById('game-width-bar').value, 
            document.getElementById('game-height-bar').value
          );
          App.config = config;
          App.game = new Phaser.Game(config);

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
                      
              







