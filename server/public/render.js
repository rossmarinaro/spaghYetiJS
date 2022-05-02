const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { gameScript } = require('../gameSchema/game.js');
const { gameMarkUp } = require('../gameSchema/index.js');


//------- ipc rendering

    ipcRenderer.on('reply', (e, args)=> {
        console.log('current path: ', args.path, 'data: ', args.data);
        window.buildGame(args);
    });


//-------- front end function handling

    function buildProject (gameData) { ipcRenderer.sendSync('buildProject', gameData); }


//------------ build user game

    window.buildGame = e => {  

    const gameData = JSON.parse(e.data); 

    //write file
        fs.mkdirSync(path.join(e.path, '\\project'));
        fs.writeFile(path.join(e.path, '\\project\\index.js'), gameMarkUp(), (err)=> {console.log(err)});
        fs.writeFile(path.join(e.path, '\\project\\game.js'), gameScript(gameData), (err)=> {console.log(err)}); // or appendFile
        fs.writeFile(path.join(e.path, '\\project\\build.sh'), `touch yoo.txt && npm run buildProject && npm run python`, (err)=> {console.log(err)});
    
    //run sh scripts
        require('child_process').exec(path.join(e.path, '\\project\\build.sh'), 
            //err => alert(err), 
            bash => eval(bash)
        );

    }