<<<<<<< HEAD
/* API */


const express = require('express'),
	App = express()
    server = require('http').Server(App), 
    port = process.env.PORT || 9090;




//---------------------------------server listen on port 
	

server.listen(port, ()=> console.log(`Welcome to port: ${port}`)); 


=======
/* API */


const express = require('express'),
	App = express()
    server = require('http').Server(App), 
    port = process.env.PORT || 9090;




//---------------------------------server listen on port 
	

server.listen(port, ()=> console.log(`Welcome to port: ${port}`)); 


>>>>>>> b96c1d3add77e89787827d315c8408560f58b360
module.exports = { express, App }