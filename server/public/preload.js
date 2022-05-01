const fs = require('fs'), { Game } = require('../app/gameSchema.js')



window.addEventListener('DOMContentLoaded', ()=>{ 





  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text;
  }
  for (const dependency of ['chrome', 'node', 'electron']){
    replaceText(`${dependency}-version`, process.versions[dependency])




  window.buildProject = game => { 
    // const game = {
    //   config: req.body.config,
    //   scene: req.body.scene
    // }
  
    //fs.writeFile('../project/game.js', Game(game), (err) => {alert(JSON.stringify(err))}), // or appendFile
  
    require('child_process').exec('buildGame.sh', 
        err => alert(err), 
        bash => eval(bash)
      );
  }




  }
});


