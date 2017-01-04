/*
* Author: Brandon Radosevich
* Date: January 4, 2016
* file: main.js
* Description: Main HTML Page for Gateway to API.
*/
 module.exports = function(app){
     var url = require('url');
     var express = require('express');
     var rootRouter = express.Router();
     //Any Generic Logic
     rootRouter.use(function(req,res,next){
         next();
     });
     app.use('/',rootRouter);
 };
