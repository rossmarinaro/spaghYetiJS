////////////////////////////////////////////////////// electron 


	//require('electron-packager');

	const electron = require('electron');
	const { app, BrowserWindow } = electron;

	function createWindow (){
		const win = new BrowserWindow({
		width: 1200,
		height: 1000,
		icon: null/* __dirname + '/public/img/logo.png' */,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true
		}
		});
		win.loadFile('public/index.html');
	}


	app.whenReady().then(createWindow);

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') 
		app.quit();
	});
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) 
		createWindow();
	});



	// const win = new BrowserWindow({width: 800, height: 800})

	// win.loadFile('public/index.html')