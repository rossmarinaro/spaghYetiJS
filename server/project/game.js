
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
                this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(100, 100, 50, 50));
            }
          }


        const config = {

            type: Phaser.AUTO,
            backgroundColor: '#000000',
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH,
              width: 200,
              height: 20
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

          new Phaser.Game(config);
          console.log('Phaser: ', Phaser);
    