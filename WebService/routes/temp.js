/*
 * Author: Brandon Radosevich
 * Date: January 4, 2016
 * file: temp.js
 * Description: Returns latest temperature from MongoDB to Client to WebService/API.
 */
console.log("Enter temp.js");
var url = require('url');
var express = require('express');
var path = require('path');
var router = express.Router();
/* Db Connection */
var mongoose = require("mongoose");
/* API Calls */
module.exports = function(app){
  router.use(function(req,res,next){
    var limit;
    var data = {
      "Success" : true,
      "Data": ""
    };
    if (req.query['limit'] != null){
      limit = parseInt(req.query['limit']);
      console.log("Limit: "+ limit);
    }//end else
    if (limit != null){
    mongoose.connect('mongodb://localhost:27017/Sensors');
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'connection error:'));
      connection.once('open', function () {
        console.log("Inside ");
        //db.collection.find().limit(1).sort({$natural:-1})
          connection.db.collection("Temperature", function(err, collection){
             collection.find().limit(limit).sort({$natural:-1}).toArray(function(err,data){
               console.log(data); // it will print your collection data
               data["Data"]  = data;
               res.json(data);
               console.log("here");
               return;
             });
          });//end
      });//end
      mongoose.connection.close()
    }//end
    else{
      mongoose.connect('mongodb://localhost:27017/Sensors');
      var connection = mongoose.connection;
      connection.on('error', console.error.bind(console, 'connection error:'));
        connection.once('open', function () {
          console.log("Inside ");
            connection.db.collection("Temperature", function(err, collection){
                collection.find({}).toArray(function(err, data){
                    console.log(data); // it will print your collection data
                    data["Data"]  = data;
                    res.json(data);
                    console.log("here");
                    return;
                });//end
            });//end
        });//end
        mongoose.connection.close()
  }//end else
  });//end router
  app.use("/temp",router);
};
