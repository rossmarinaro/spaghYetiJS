

	const fs = require('fs'), 
	
	{ express, App } = require('./app/api.js'),		
	{ Game } = require('./app/gameSchema.js');

	App.use(express.static(__dirname + '/public'));

	App.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

	App.use(express.json());


//--------------------------------------- write project


	let bool = false;

	App.post('/buildProject', (req, res) => {

		if (bool === true)
			return
		bool = true;

		setTimeout(()=> bool = false, 200);

		console.log('game data: ', req.body); 
		
		const game = {
			config: req.body.config,
			scene: req.body.scene
		}
	
		fs.writeFile('./project/game.js', Game(game), () => {}), // or appendFile
		require('child_process').exec('buildGame.sh', 
				err => console.log(err), 
				bash => console.log(bash)
			);
		
		res.status(200).send('building project...');
	
	});
 

	//---------- electron

		require('./app/electron.js');

	