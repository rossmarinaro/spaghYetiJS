

	const  //{ endpoints } = require('./app/endpoints.js'),
	{ express, App } = require('./app/api.js');

	App.use(express.static(__dirname + '/public'));

	App.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

	App.use(express.json());



	//---------- electron

	require('./app/electron.js');   

	