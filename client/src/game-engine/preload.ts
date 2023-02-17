
import 'regenerator-runtime/runtime';

import { App } from './app';

export default class Preload {

    private app: App
    private scene: any
    
    constructor(app: App)
    {
        this.app = app;
        this.scene = app.scene;

    }

    //process file type

    public async process (file: Blob): Promise<void>
    {
        if (file.type.startsWith('image')) 
            return this.image(file);
    }

    private async image (file: Blob): Promise<void> 
    {
        if (file.type && !file.type.startsWith('image/'))
        {
          console.log('File is not an image', file.type, file);
          return;
        }

        const assetKey = "mySprite",
              assetVar = "this.mySprite",
              assetPath = await (window as any).loadAsset(assetKey, file);  

        this.scene.preload.push(`this.load.image("${assetKey}", "${assetPath}");`);  
        this.scene.create.push(`${assetVar} = this.add.sprite(0, 0, "${assetKey}")`);
        
    //buffer image to asset menu

        const img: any = document.createElement('img');
        document.getElementById('output')?.appendChild(img);
        this.app.fileReader.addEventListener('load', (e: any) => { 
            //alert('please create a canvas first');
            img.src = e.target.result;
        });
    }
}

