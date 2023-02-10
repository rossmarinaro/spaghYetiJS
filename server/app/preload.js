<<<<<<< HEAD
/* ELECTRON PRELOAD SCRIPT */

const { GameManager } = require('./gameSchema.js');


window.addEventListener('DOMContentLoaded', ()=> {

  //------- log platform versions

    for (const dependency of ['chrome', 'node', 'electron'])
      console.log(`${dependency}-version`, process.versions[dependency]);

  //-------- init game manager instance
  
      const gm = new GameManager('..\\resources\\buildSys\\'.replace(/\\/g, "/"));

  //-------- front end function handling

      window.getApplicationPath = () => ipcRenderer.sendSync('getPath'); 

      window.loadAsset = async (key, file) => gm.loadAsset(key, file);

  //------------ generate project / build user game

  
      window.buildProject = gameData => ipcRenderer.sendSync('buildProject', gameData); 
  
      window.buildGame = e => gm.bundler.buildGame(e);
});
   

=======
/* ELECTRON PRELOAD SCRIPT */

const { GameManager } = require('./gameSchema.js');


window.addEventListener('DOMContentLoaded', ()=> {

  //------- log platform versions

    for (const dependency of ['chrome', 'node', 'electron'])
      console.log(`${dependency}-version`, process.versions[dependency]);

  //-------- init game manager instance
  
      const gm = new GameManager('..\\resources\\buildSys\\'.replace(/\\/g, "/"));

  //-------- front end function handling

      window.getApplicationPath = () => ipcRenderer.sendSync('getPath'); 

      window.loadAsset = async (key, file) => gm.loadAsset(key, file);

  //------------ generate project / build user game

  
      window.buildProject = gameData => ipcRenderer.sendSync('buildProject', gameData); 
  
      window.buildGame = e => gm.bundler.buildGame(e);
});
   

>>>>>>> b96c1d3add77e89787827d315c8408560f58b360
