////////////////////////////////////////////////////// electron 
	const path = require('path')

	//require('electron-packager');

	const electron = require('electron');
	const { app, BrowserWindow } = electron; 

	function createWindow (){
			const win = new BrowserWindow({
			width: 1200,
			height: 1000,
			//icon: __dirname + '../public/img/logo.ico',
			autoHideMenuBar: true,
			webPreferences: {
				nodeIntegration: true,
				preload: path.join(__dirname, '../public/preload.js')
			}
		});
		win.loadFile('public/index.html');
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
		app.quit();
	});
	

	// require('electron-reload')(__dirname + '/app/index.html', {
	// electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	// });


