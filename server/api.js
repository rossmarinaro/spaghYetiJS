/* API */


const express = require('express'),
	App = express()
    server = require('http').Server(App), 
    port = process.env.PORT || 9090;

module.exports = { express, App, server, port}