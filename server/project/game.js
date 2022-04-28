
				
			
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
					"this.add.graphics({fillStyle: {color: 0xff0000}}).fillRectShape(new Phaser.Geom.Rectangle(0, 0, 50, 50));"
				}
			  }


			  const config = {
				type: Phaser.AUTO,
				backgroundColor: '#000000',
				scale: {
				  mode: Phaser.Scale.FIT,
				  autoCenter: Phaser.Scale.CENTER_BOTH,
				  width: 200,
				  height: 200
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


		