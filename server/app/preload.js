/* ELECTRON PRELOAD SCRIPT */

const fs = require('fs');
const path = require('path');
const { gameScript } = require('../gameSchema/game.js');
const { gameMarkUp } = require('../gameSchema/index.js');
const { WebpackConfig } = require('./webpack.js');



window.addEventListener('DOMContentLoaded', ()=> {

  //------- log platform versions

    for (const dependency of ['chrome', 'node', 'electron'])
      console.log(`${dependency}-version`, process.versions[dependency]);


  //-------- front end function handling

      window.buildProject = (gameData) => ipcRenderer.sendSync('buildProject', gameData); 



  //------------ generate project / build user game
  
      window.buildGame = e => {  
  
      const gameData = JSON.parse(e.data),
            filepath = e.path;                      
   
      ////create project directory
        if (!fs.existsSync(path.join(filepath, '..\\resources\\buildSys\\project')))
          fs.mkdirSync(path.join(filepath, '..\\resources\\buildSys\\project'));

      //write project files
        fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\project\\index.html'), gameMarkUp(), ()=> {});
        fs.writeFile(path.join(filepath, '..\\resources\\buildSys\\project\\game.js'), gameScript(gameData), ()=> {}); // or appendFile
      
  //run sh scripts, instantiate webpack / build app
          
          new WebpackConfig(filepath);

          require('child_process').exec(

          ////`cd extern && npm run build`, //local

           ////build project: 
            `cd ${path.join(filepath, '..\\resources\\buildSys\\')} && build.sh`, 
          

            (err, stout, sterr) => {
              if (err)
                console.log('exe err: ', err);
            console.log(stout, sterr);
          });
      }
});
   

