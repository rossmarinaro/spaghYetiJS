/*** PASTABOSS MAIN */



const path = require('path'),
		cors = require('cors'),										// path module
		fs = require('fs'),											// file sys
		{ express, app, server, port } = require('./api.js');		// http express modules
		//require('./electron.js');									// electron desktop builder
		app.use(express.static(__dirname + '/public'));
		app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
		app.use(express.json());
		app.use(cors());

	// //node cc addon
	// 	require('./optimization.js');
	// //python
	// 	require('./python/main.js');
		

//--------------------------------------- check room cap

	app.get('/checkCap', (req, res) => {
		let spawns = require('./socket.js').spawns.length;
		console.log('spawns: ', spawns); 
		res.send(JSON.stringify({spawns: spawns}));
	});
 

	//---------------------------------server listen on port 
	
	server.listen(port, ()=> console.log(`Welcome to port ${port}`)); 





