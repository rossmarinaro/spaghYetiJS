const { ipcRenderer } = require('electron');


//------- ipc rendering

    ipcRenderer.on('reply', (e, args)=> {
        console.log('current path: ', args.path, 'data: ', args.data);
        window.buildGame(args);
    });
