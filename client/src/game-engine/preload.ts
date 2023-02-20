
import 'regenerator-runtime/runtime';

import { App } from './app';

export default class Preload {

    private static scene: any
    
    //process file type

    public static async process (file: Blob): Promise<void>
    {
        if (file.type.startsWith('image')) 
            Preload.image(file);
    }

    private static async image (file: Blob): Promise<void> 
    {
        if (file.type && !file.type.startsWith('image/'))
        {
          console.log('File is not an image', file.type, file);
          return;
        }

        const assetKey = "mySprite",
              assetVar = "this.mySprite",
              assetPath = await (window as any).loadAsset(assetKey, file),
              scene = App.scene;
              
        scene.preload.push(`this.load.image("${assetKey}", "${assetPath}");`);  
        scene.create.push(`${assetVar} = this.add.sprite(0, 0, "${assetKey}")`);
        
    //buffer image to asset menu

        const img: any = document.createElement('img');
        document.getElementById('output')?.appendChild(img);
        App.fileReader.addEventListener('load', (e: any) => { 
            //alert('please create a canvas first');
            img.src = e.target.result;
        });
    }
}

