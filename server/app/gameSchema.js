
/* GAME MANAGER */


const { WebpackConfig } = require('./webpack.js'),
    fs = require('fs'),
    path = require('path');


class GameManager { 

  constructor (baseDir)
  {
    this.baseDir = baseDir;
    this.bundler = new WebpackConfig(fs, path, this);
    this.assets = {
      image: {},
      sprite: {},
      atlas: {},
      spritesheet: {},
      audio: {}
    }
  }

//--------------------------------- load asset

  async loadAsset(key, file)
  {
    
    const appPath = await window.getApplicationPath();

  ////creates asset dir if doesn't exist

    if (!fs.existsSync(path.join(appPath, this.baseDir, 'project/assets')))
     fs.mkdirSync(path.join(appPath, this.baseDir, 'project/assets'));
    
    let newPath = `${'assets/' + key + '.png'}`.replace(/\\/g, "/"),
        jsonProp = JSON.stringify({[key]: newPath}); 

    console.log('new path: ', newPath)

    this.assets.image[jsonProp] = jsonProp; 

  ////reads filepath of selected asset and copies file to assets dir

    fs.readFile(file.path, (err, data) => {
      if (err) throw err;
        fs.writeFile(path.join(appPath, this.baseDir, newPath), data, 'base64',    
        err => {
          if (err) throw err;
          console.log('asset saved', data, '\nassets:', this.assets);
        });
    }); 

    return newPath;
  }

  //---------------------------------- index html

  markup()
  {
    return (
      `
      <!DOCTYPE html> 

        <html>
        <head>
            <meta charset="utf-8">

            <title>your cool game </title>

          <!-- <link rel="stylesheet" type="text/css" href="/style.css"/> -->


            </head>

          <body style="margin: auto;">

            <h1 >Your Cool Game</h1>


          <div id="game">
              
          </div> 
          <script src="bundle.min.js"></script>
              
          </body>

          </html>
      `
    );

  }

  //-------------------------------- game script

  script(content)
  {

    const
      width = content.config.scale.width,
      height = content.config.scale.height,
      init = content.scene.init,
      preload = content.scene.preload,
      create = content.scene.create;

    console.log('embedding code: ', create);

    return (

      `
      import Phaser from 'phaser';
      
      class Boot extends Phaser.Scene {
          constructor(){
            super('Boot');     
          }
          init()
          {
            ${init}
          }
          preload()
          {
            ${preload}
          }
          create()
          {
            ${create}
          }
          update()
          {
            
          }
        }

      const config = {

          type: Phaser.AUTO,
          backgroundColor: '#000000',
          scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: ${width},
            height: ${height}
          },
          parent: 'game',
          dom: {
                createContainer: true
          },
          scene: [Boot],
          physics: {
            default: 'arcade',
            arcade: {
              debug: false,
              gravity: { y: 300 }
            }
          }
        };

        new Phaser.Game(config);
        console.log('Phaser Version: ', Phaser.VERSION);
      `
    );
  }

}


