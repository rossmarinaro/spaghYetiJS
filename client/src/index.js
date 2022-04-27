import Phaser from 'phaser';


//init canvas

     let bool = false;

     document.getElementById('form-submit').addEventListener('click', e =>{

      e.preventDefault();
      e.stopPropagation();
      if (bool === true)
        return;
      bool = true;

        createCanvas(document.getElementById('game-width-bar').value, document.getElementById('game-height-bar').value)

      
    });

    let game = null;
    function createCanvas(width, height)
    {
      const config = {
        type: Phaser.AUTO,
        backgroundColor: '#000000',
        scale: {
          parent: 'game',
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: width,
          height: height
        },
        parent: 'Leaderboard',
          dom: {
              createContainer: true
        },
        scene: [],
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravity: { y: 300 }
          }
        }
      }
      game = new Phaser.Game(config);
    }






let dataURL;
const openFile = file =>{
    const input = file.target,
    reader = new FileReader();
    reader.onload = ()=>{
        dataURL = reader.result //,
        //output = document.getElementById('output');
        //output.src = dataURL;
        console.log(dataURL)
    }
    reader.readAsDataURL(input.files[0])
}