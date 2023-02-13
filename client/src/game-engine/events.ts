
    import Phaser from 'phaser';

    import { App } from './app.js';
    import { Config } from './game.js';



    export class EventListener {

        private app: App
        private canMakeCanvas: number

        constructor(app: App)
        {

            this.app = app;
            this.canMakeCanvas = 0;


            document.getElementById('load-asset-bar')?.addEventListener('change', e => processAction(e));

            document.getElementById('make-canvas')?.addEventListener('click', e => processAction(e));

            document.getElementById('reset-canvas')?.addEventListener('click', e => processAction(e));

            document.getElementById('build-project')?.addEventListener('click', e => processAction(e));
                            
            document.getElementById('test-input')?.addEventListener('click', e => processAction(e));

            document.getElementById('add-square')?.addEventListener('click', e => processAction(e));

        //------------------------ process action

            const processAction = (e: any) => {   

                e.preventDefault();
                e.stopPropagation();
                
                switch (e.srcElement.id)
                {
                    case 'load-asset-bar': this.loadAsset(e.target.files[0]); break;
                    case 'add-square': this.addSquare(); break;
                    case 'make-canvas': this.constructCanvas(); break;
                    case 'reset-canvas': this.resetCanvas(); break;
                    case 'build-project': this.buildProject(); break;
                    case 'test-input': this.runGame(); break;
                }
            }
        }

    //---------------------------- load asset

        private loadAsset(asset: Blob): void
        {
            this.app.fileReader.readAsDataURL(asset);
            this.app.preload.process(asset);
        }

    //--------------------------- add square

        private addSquare(): void
        {
            const x: any = document.getElementById('sq-pos-x'),
                  y: any = document.getElementById('sq-pos-y'),
                valX = !x.value ? 0 : x.value,
                valY = !y.value ? 0 : y.value;

            this.app.scene.create.push(`this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(${valX}, ${valY}, 50, 50));`);
        }

    //--------------------- make canvas

        private constructCanvas(): void
        {
            if (this.app.game !== null || this.canMakeCanvas === 1)
                return;

            this.canMakeCanvas++;
            this.canMakeCanvas = 0;

        // creates canvas

            const width: any = document.getElementById('game-width-bar'),
                  height: any = document.getElementById('game-height-bar'),
            
                  config = new Config(width.value, height.value);
            
            this.app.config = config;
        }

    //------------------------ reset canavs

        private resetCanvas(): void
        {
            if (this.app.game === null)
                return;

            this.app.game.destroy(true);
            this.app.game = null;
            this.app.config = null;
            this.app.scene.create = [];
        }

    //----------------------------- run game

        private runGame(): void
        {
            if (this.app.config !== null && this.app.game === null)
                this.app.game = new Phaser.Game(this.app.config);
        }


    //--------------------------- build project

        private buildProject(): void
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

            (window as any).buildProject(game);
        }
    }