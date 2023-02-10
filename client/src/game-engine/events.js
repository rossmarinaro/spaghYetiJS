
    import Phaser from 'phaser';

    import { Config } from './game.js';


    export class EventListener {

        constructor(app)
        {

            this.app = app;
            this.makeCan = 0;


            document.getElementById('load-asset-bar').addEventListener('change', e => processAction(e));

            document.getElementById('make-canvas').addEventListener('click', e => processAction(e));

            document.getElementById('reset-canvas').addEventListener('click', e => processAction(e));

            document.getElementById('build-project').addEventListener('click', e => processAction(e));
                            
            document.getElementById('test-input').addEventListener('click', e => processAction(e));

            document.getElementById('add-square').addEventListener('click', e => processAction(e));

        //------------------------ process action

            const processAction = e => {   

                e.preventDefault();
                e.stopPropagation();
                
                switch (e.srcElement.id)
                {
                    case 'load-asset-bar': this.loadAsset(e.target.files[0]); break;
                    case 'add-square': this.addSquare(); break;
                    case 'make-canvas': this.makeCanvas(); break;
                    case 'reset-canvas': this.resetCanvas(); break;
                    case 'build-project': this.buildProject(); break;
                    case 'test-input': this.runGame(); break;
                }
            }
        }

    //---------------------------- load asset

        loadAsset(asset)
        {
            this.app.fileReader.readAsDataURL(asset);
            this.app.preload.process(asset);
        }

    //--------------------------- add square

        addSquare()
        {
            const x = !document.getElementById('sq-pos-x').value ? 0 : document.getElementById('sq-pos-x').value,
            y = !document.getElementById('sq-pos-y').value ? 0 : document.getElementById('sq-pos-y').value;
            this.app.scene.create.push(`this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(${x}, ${y}, 50, 50));`);
        }

    //--------------------- make canvas

        makeCanvas()
        {
            if (this.app.game !== null || this.makeCan === 1)
                return;

            this.makeCan++;
            this.makeCan = 0;

        //// creates canvas

            const config = new Config(document.getElementById('game-width-bar').value, document.getElementById('game-height-bar').value);
            this.app.config = config;
        }

    //------------------------ reset canavs

        resetCanvas()
        {
            if (this.app.game === null)
                return;

            this.app.game.destroy(true);
            this.app.game = null;
            this.app.config = null;
            this.app.scene.create = [];
        }

    //----------------------------- run game

        runGame()
        {
            if (this.app.config !== null && this.app.game === null)
            this.app.game = new Phaser.Game(this.app.config);
        }


    //--------------------------- build project

        buildProject()
        {
            if (this.app.game === null)
                return;

            
            const game = JSON.stringify({
                config: this.app.config,
                scene: this.app.scene
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
        }
    }