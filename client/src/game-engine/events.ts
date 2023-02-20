

    import { App } from './app';
    import { Config } from './game';




    export class EventListener {

        private static canMakeCanvas: number = 0


    //------------------------ process action

        public static processAction (e: any): void 
        {   

            e.preventDefault();
            e.stopPropagation();

            switch (e.nativeEvent.submitter.id)
            {
                case 'load-asset-bar': EventListener.loadAsset(e.target.files[0]); break;
                case 'add-square': EventListener.addSquare(); break;
                case 'make-canvas': EventListener.constructCanvas(); break;
                case 'reset-canvas': EventListener.resetCanvas(); break;
                case 'build-project': EventListener.buildProject(); break;
                case 'test-input': EventListener.runGame(); break;
            }
        }


    //---------------------------- load asset


        private static loadAsset(asset: Blob): void
        {
            App.fileReader = new FileReader;
            App.fileReader.readAsDataURL(asset);
            App.preload.process(asset);
        }


    //--------------------------- add square


        private static addSquare(): void
        {
            const x: any = document.getElementById('sq-pos-x'),
                  y: any = document.getElementById('sq-pos-y'),
                valX = !x.value ? 0 : x.value,
                valY = !y.value ? 0 : y.value;

            App.scene.create.push(`this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(${valX}, ${valY}, 50, 50));`);
        }


    //--------------------- make canvas


        private static constructCanvas(): void
        {
            if (App.game !== null || EventListener.canMakeCanvas === 1)
                return;

            EventListener.canMakeCanvas++;
            EventListener.canMakeCanvas = 0;

        // creates canvas

            const width: any = document.getElementById('game-width-bar'),
                  height: any = document.getElementById('game-height-bar'),
            
                  config = new Config(width.value, height.value);
            
            App.config = config;
        }


    //------------------------ reset canavs


        private static resetCanvas(): void
        {
            if (App.game === null)
                return;

            App.game.destroy(true);
            App.game = null;
            App.config = null;
            App.scene.create = [];
        }


    //----------------------------- run game


        private static runGame(): void
        {
            if (App.config !== null && App.game === null)
                App.game = new Phaser.Game(App.config);
        }


        
    //--------------------------- build project


        private static buildProject(): void
        {
            if (App.game === null)
                return;

            
            const game = JSON.stringify({
                config: App.config,
                scene: App.scene
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