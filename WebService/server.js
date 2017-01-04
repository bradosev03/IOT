/*
* Author: Brandon Radosevich
* Date: January 4, 2016
* file: server.js
* Description: RestFUL API for Mobile/Web Applications to Interface withe MongoDB.
*/
var express = require("express");
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();

//all environments
app.set('port', process.env.port || 3000);
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.use(bodyParser.json());
http.createServer(app).listen(app.get('port'),function(){
    console.log("Express Server listening on port " + app.get('port'));
});

routes = require('./routes')(app);
