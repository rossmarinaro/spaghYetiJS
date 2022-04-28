import { Ajax } from './ajax.js';
import { Loader } from './game.js';

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
          create: null
        },
        config: null,
        ajax: new Ajax,
        fileReader: new FileReader()
      }
    //  App.game = new Phaser.Game(new Config(200, 200));