
const { ipcRenderer } = require('electron');


//------- ipc rendering

    ipcRenderer.on('triggerBuild', (e, args)=> {
        window.buildGame(args);
        console.log('building game', args.data);
    });

    ipcRenderer.on('sendPath', (e, args)=> console.log('application path: ', args));