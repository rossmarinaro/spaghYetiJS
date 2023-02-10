<<<<<<< HEAD
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

=======
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

>>>>>>> b96c1d3add77e89787827d315c8408560f58b360
});