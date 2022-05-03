//------------------------------- electron 

	const path = require('path');
	const electron = require('electron');
	const { app, BrowserWindow, ipcMain } = electron; 

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
////log path
	//console.log('current path: ', app.getPath('exe'/* 'userData' */));


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

	ipcMain.on('buildProject', async (e, args) => {

		const strpath = app.getPath('exe').toString(),
			  data = { path: strpath, data: args };

		e.returnValue = data;
		e.reply('reply', data);
		console.log(args);
		//app.exit();
	});



	// require('electron-reload')(__dirname + '/app/index.html', {
	// electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	// });
