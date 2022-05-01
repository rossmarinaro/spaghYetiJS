
import { EventListener } from './events.js';
import { Ajax } from './ajax.js';
  


//-------- Main Application

    export class App  {

        constructor()
        {
          this.game = null;
          this.scene = {
            init: [],
            preload: [],
            create: [],
            update: []
          };
          this.config = null,
          this.ajax = new Ajax,
          this.events = new EventListener(this)
          this.fileReader = new FileReader()
        }
        preload (file) 
        {
          if (file.type && !file.type.startsWith('image/'))
          {
            console.log('File is not an image', file.type, file);
            return;
          }
  
          const img = document.createElement('img');
          document.getElementById('output').appendChild(img);
          this.fileReader.addEventListener('load', e => { 
              img.src = e.target.result;
              typeof Loader === 'function' ? Loader(img.src) : alert('please create a canvas first');
          });

        }

      }

    
