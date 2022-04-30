/* API */


const express = require('express'),
	App = express()
    server = require('http').Server(App), 
    port = process.env.PORT || 9090;




//---------------------------------server listen on port 
	

server.listen(port, ()=> console.log(`Welcome to port: ${port}`)); 


module.exports = { express, App }