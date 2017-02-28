var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var databaseInstance = require("../config/server");
var tblUserSchema = require("../models/tbl_userSchema");   
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var db = mongoose.connection;
//var userModel = mongoose.model('tbl_userSchema', tblUserSchema);
/* GET home page. */
router.post('/', function (req, res) {  
   
    // exports.validateLogin = function (request, response) {
     
    var loginId = req.body.loginId; 
    var userPassword = req.body.userPassword;
    //  var result = db.collection();
  var sd=  databaseInstance.logmeIn();
    //tblUserSchema.find().exec(function (err, res) {
    //    if (err) {
    //        response.send(500, { error: err });
    //    }
    //    else {
    //        response.send(res);
    //    }
    //})
    var result1 = db.collection('tbl_userSchema').find({ UserName: 'Pankaj' });
    var rr = result1;
    //userModel.findOne({ UserName: loginId }, function (err, UserName)
    //{
    //        if (!err && UserName && Password === userPassword) {

    //            res.send({ status: 'success' });

    //        }

    //        else {
    //            res.send({ status: 'failed' });
    //        }

    //    });
   // };










});

module.exports = router;