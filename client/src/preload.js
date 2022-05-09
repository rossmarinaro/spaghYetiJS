import 'regenerator-runtime/runtime';

export default class Preload {
    
    process(asset)
    {
        //switch (file.type)
        //{
            //case 'image': 
                return this.image(asset);
        //}
    }

    async image (file) 
    {
        if (file.type && !file.type.startsWith('image/'))
        {
          console.log('File is not an image', file.type, file);
          return;
        }

        const assetKey = "mySprite",
              assetVar = 'this.mySprite',
              assetPath = await window.loadAsset(imgName, file);

        this.scene.preload.push(`this.load.image(${assetKey}, "${file.path.replace(/\\/g, "/")}");`);
        this.scene.create.push(`${assetVar} = ${assetPath}`);
        
        const img = document.createElement('img');
        document.getElementById('output').appendChild(img);
        this.fileReader.addEventListener('load', e => { 
            //alert('please create a canvas first');
            img.src = e.target.result;
        });
    }

}