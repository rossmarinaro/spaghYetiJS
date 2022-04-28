

	const fs = require('fs'),											
	{ express, App, server, port } = require('./api.js');		
	const { runPython } = require('./python/main.js');
	
	
	//App.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
	App.use(express.json());

	//require('./electron.js')
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
			console.log('embedding code: ', contents.scene.create)

		return (
			`
			import Phaser from 'phaser';
			
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
let bool = false
	App.post('/buildProject', (req, res) => {
		if (bool === true)
		return
		bool = true
		//console.log('game data: ', req.body); 
		
		const game = {
			config: req.body.config,
			scene: req.body.scene
		}

		//appendFile
		fs.writeFile('./project/game.js', Game(game), () => {});
		runPython()
		//console.log(server)

		//server.listen(7070, ()=> console.log(`Welcome to port: 7070`)); 
		// server.close(()=>{ 
		// 	App.use(express.static(__dirname + '/dist'));
		// 	server.listen(7070, ()=> console.log(`Welcome to port: 7070`)); 
		// })
	});
 
	//runPython()



//---------------------------------server listen on port 
	
	server.listen(port, ()=> {
		console.log(`Welcome to port: ${port}`);
		App.use(express.static(__dirname + '/public'));
	}); 







