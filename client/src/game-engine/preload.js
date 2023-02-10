
import 'regenerator-runtime/runtime';

export default class Preload {
    
    constructor(app)
    {
        this.app = app;
        this.scene = app.scene;

    ////process file type    
        this.process = file => {
            if (file.type.startsWith('image')) 
                return this.image(file);
        }
    }

    async image (file) 
    {
        if (file.type && !file.type.startsWith('image/'))
        {
          console.log('File is not an image', file.type, file);
          return;
        }

        const assetKey = "mySprite",
              assetVar = "this.mySprite",
              assetPath = await window.loadAsset(assetKey, file);  

        this.scene.preload.push(`this.load.image("${assetKey}", "${assetPath}");`);  
        this.scene.create.push(`${assetVar} = this.add.sprite(0, 0, "${assetKey}")`);
        
    ////buffer image to asset menu
        const img = document.createElement('img');
        document.getElementById('output').appendChild(img);
        this.app.fileReader.addEventListener('load', e => { 
            //alert('please create a canvas first');
            img.src = e.target.result;
        });
    }

