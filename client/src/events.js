    import Phaser from 'phaser';

    import { Config } from './game.js';


    export class EventListener{

        constructor(app)
        {

            //------------------ open asset

    
            document.getElementById('load-asset-bar').addEventListener('change', e => {
                //console.log('onChange:', e)
                app.fileReader.readAsDataURL(e.target.files[0]);
                app.preload(e.target.files[0]);

            });

            //--------------------- make canvas


            let makeCanvas = 0;

            document.getElementById('make-canvas').addEventListener('click', e => {

                e.preventDefault();
                e.stopPropagation();

                if (app.game !== null || makeCanvas === 1)
                    return;

                makeCanvas++;
                makeCanvas = 0;


            //// creates canvas

                const config = new Config(document.getElementById('game-width-bar').value, document.getElementById('game-height-bar').value);

                app.config = config;
                
            });

            //------------------------ reset canvas

            document.getElementById('reset-canvas').addEventListener('click', e =>{ 

                e.preventDefault();
                e.stopPropagation();

                if (app.game === null)
                    return;

                app.game.destroy(true);
                app.game = null;
                app.scene.create = [];

            });

            //--------------------------- build project


            document.getElementById('build-project').addEventListener('click', e =>{ 
                
                e.preventDefault();
                e.stopPropagation();

                if (app.game === null)
                    return;

                
                const game = JSON.stringify({
                    config: app.config,
                    scene: app.scene
                });

                
                // fetch('/buildProject', app.ajax.request('POST', game))
                // .then(res => res.text())
                // .then(txt => {
                //   alert(txt);
                //   console.log(txt)
                // })
                // .catch(err => {
                //   alert('error: ' + JSON.stringify(err));
                //   console.log(err);
                
                // });
                window.buildProject(game);
            });
                            
                    
            
            //--------------------------------- run test
        
            
            document.getElementById('test-input').addEventListener('click', e =>{ 
                
                e.preventDefault();
                e.stopPropagation();

                runGame(); 
                
            
            });


            //--------------------------------- 
        
            
                document.getElementById('add-square').addEventListener('click', e =>{ 
            
                e.preventDefault();
                e.stopPropagation();

                const x = !document.getElementById('sq-pos-x').value ? 0 : document.getElementById('sq-pos-x').value,
                      y = !document.getElementById('sq-pos-y').value ? 0 : document.getElementById('sq-pos-y').value;

                app.scene.create.push(`this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(${x}, ${y}, 50, 50));`);
            });







            //----------------------------- run game

            function runGame()
            {
                if (app.config !== null && app.game === null)
                app.game = new Phaser.Game(app.config);
            }
        }
    }