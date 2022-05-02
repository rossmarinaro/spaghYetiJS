
function gameMarkUp()
{
    return (
        `
        <!DOCTYPE html> 

            <html>
            <head>
                <meta charset="utf-8">

                <title>your cool game </title>

                <!-- <link rel="stylesheet" type="text/css" href="/style.css"/> -->


                </head>

            <body style="margin: auto;">

                <h1 >Your Cool Game</h1>


            <div id="game">
                
            </div> 
            <script src="bundle.min.js"></script>
                
            </body>

            </html>
        `
    );
} 

module.exports = { gameMarkUp };