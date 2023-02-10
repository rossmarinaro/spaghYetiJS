
//------------------------------- electron 

	const
		path = require('path'),
		electron = require('electron'),
		{ app, BrowserWindow, ipcMain } = electron;

//-------- create window

	function createWindow ()
	{
		const win = new BrowserWindow({
			width: 1200,
			height: 1000,
			icon: path.join(__dirname, '../public/img/logo.png'),
			autoHideMenuBar: true,
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(__dirname, './preload.js')
			}
		});
	//load content to window
		win.loadFile('public/index.html');
	//shows debugger
		//win.webContents.openDevTools(); 		
	}

	app.whenReady().then(()=>{
		createWindow();
		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) 
			createWindow();
		});

	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') 
			app.exit()//app.quit();
	});
	

////---------- IPC MAIN

	const basePath = app.getPath('exe').toString();

	ipcMain.on('getPath', async e =>{
		e.returnValue = basePath;
		e.reply('sendPath', basePath);
	});

	ipcMain.on('buildProject', async (e, args) => {

		const data = { path: basePath, data: args };

		e.returnValue = data;
		e.reply('triggerBuild', data);
		console.log(args);
		//app.exit();
	});


	// require('electron-reload')(__dirname + '/app/index.html', {
	// electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	// });

