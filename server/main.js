/*** PASTABOSS MAIN */



const path = require('path'),
	//	cors = require('cors'),										// path module
		fs = require('fs'),											// file sys
		{ express, app, server, port } = require('./api.js');		// http express modules
		const { runPython } = require('./python/main.js');
		//require('./electron.js');									// electron desktop builder
		app.use(express.static(__dirname + '/public'));
		app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
		app.use(express.json());
		//app.use(cors());

	// //node cc addon
	// 	require('./optimization.js');
	// //python
	 	//require('./python/main.js');
		

//fs.open('./build.sh', err => console.log('err', err))



	function Game (contents)
	{

		const 
			width = contents.config.scale.width,
			height = contents.config.scale.height,

			//init = contents.scene.init,
			//preload = contents.scene.preload,
			create = contents.scene.create;
console.log(contents.scene.create)

		return (
			`
				
			
			class Boot extends Phaser.Scene {
				constructor(){
				  super('Boot');     
				}
				init()
				{
					
				}
				preload()
				{
				
				}
				create()
				{
					${create}
				}
			  }


			  const config = {
				type: Phaser.AUTO,
				backgroundColor: '#000000',
				scale: {
				  mode: Phaser.Scale.FIT,
				  autoCenter: Phaser.Scale.CENTER_BOTH,
				  width: ${width},
				  height: ${height}
				},
				parent: 'game',
				dom: {
					  createContainer: true
				},
				scene: [Boot],
				physics: {
				  default: 'arcade',
				  arcade: {
					debug: false,
					gravity: { y: 300 }
				  }
				}
			  };


		`)
	}



//--------------------------------------- write project

	app.post('/buildProject', (req, res) => {

		//console.log('game data: ', req.body); 
		
		const game = {
			config: req.body.config,
			scene: req.body.scene
		}

		//appendFile
		fs.writeFile('./project/game.js', Game(game), () => {})


		runPython();

	});
 

	//---------------------------------server listen on port 
	
	server.listen(port, ()=> console.log(`Welcome to port: ${port}`)); 





