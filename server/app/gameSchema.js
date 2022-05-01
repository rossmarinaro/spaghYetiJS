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

            new Phaser.Game(config);
            console.log('Phaser: ', Phaser);
          `
        )
}


module.exports = { Game }