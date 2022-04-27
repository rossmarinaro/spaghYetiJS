/* API */


const express = require('express'),
	app = express()
    server = require('http').Server(app), 
    port = process.env.PORT || 9000;

module.exports = { express, app, server, port}