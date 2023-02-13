import { EventListener } from './events.js';
import { Ajax } from './ajax.js';

import Preload from './preload.js';
  

//-------- Main Application

  export class App  {

    public ajax: Ajax
    public events: EventListener
    public preload: Preload 
    public fileReader: FileReader
    public config: any
    public game: any
    public scene: any

      constructor()
      {
        this.game = null;
        this.scene = {
          init: [],
          preload: [],
          create: [],
          update: []
        };
        this.config = null;
        this.ajax = new Ajax;
        this.events = new EventListener(this);
        this.fileReader = new FileReader();
        this.preload = new Preload(this);

      }

    //----------------------------

      
  }

