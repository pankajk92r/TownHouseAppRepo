var mongoose = require("mongoose");
mongoose.Connection('mongodb://localhost:27017/TownHouseApp');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var userSchema = {
    "userEmail": String,
    "userPassword": String
};
// create model if not exists.
module.exports = mongoose.model('userLogin', userSchema);