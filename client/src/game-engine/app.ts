import { EventListener } from './events';
import { Ajax } from './ajax';
import Preload from './preload';


//-------- Main Application

  export class App  {

    public static ajax: typeof Ajax = Ajax
    public static events: typeof EventListener = EventListener
    public static preload: typeof Preload = Preload
    public static fileReader: FileReader
    public static config: any = null
    public static game: any = null
    public static scene: any = {
      init: [],
      preload: [],
      create: [],
      update: []
    }
      
  }

