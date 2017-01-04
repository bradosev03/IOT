/*
 * Author: Brandon Radosevich
 * Date: January 4, 2016
 * file: test.js
 * Description: Test Page for rendering HTML Content.
 */
module.exports = function(app){
    var url = require('url');
    var express = require('express');
    var path = require('path');
    var router = express.Router();
    router.use(function(req,res,next){
            res.sendFile(path.join(__dirname,'../','views','test.html'));
    });
    app.use("/test",router);
};
