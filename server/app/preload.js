/* ELECTRON PRELOAD SCRIPT */

const { GameManager } = require('./gameSchema.js');


window.addEventListener('DOMContentLoaded', ()=> {

  //------- log platform versions

    for (const dependency of ['chrome', 'node', 'electron'])
      console.log(`${dependency}-version`, process.versions[dependency]);


      const gm = new GameManager('..\\resources\\buildSys\\'.replace(/\\/g, "/"));

  //-------- front end function handling

      window.getApplicationPath = () => ipcRenderer.sendSync('getPath'); 

      window.buildProject = gameData => ipcRenderer.sendSync('buildProject', gameData); 

      window.loadAsset = (key, file) => gm.loadAsset(key, file);

  //------------ generate project / build user game
  
      window.buildGame = e => gm.bundler.buildGame(e);
});
   

