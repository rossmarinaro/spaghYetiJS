/* ELECTRON PRELOAD SCRIPT */


const { Game } = require('../app/gameSchema.js'),
      fs = require('fs');
const path = require('path')



window.addEventListener('DOMContentLoaded', ()=>{ 
  //------- log platform versions
    //for (const dependency of ['chrome', 'node', 'electron'])
      //alert(`${dependency}-version`+ JSON.stringify(process.versions[dependency]));


      window.buildProject = e => { 

        const data = JSON.parse(e);
        fs.writeFile(path.join(__dirname, '../project/game.js'), Game(data), () => {}); // or appendFile
    
        require('child_process').exec('buildGame.sh', 
            err => alert(err), 
            bash => eval(bash)
          );
    }
});
