var mongoose = require('mongoose');
mongoose.Connection('mongodb://127.0.0.1:27017/TownHouseApp'); 
var mongoSchema = mongoose.Schema;
var tbl_userSchema = {
    "UserName": String,
    "Email": String,
    "Password": String,
    "City": String,
    "Country": String,
    "Photo": String,
    "VerifiedUser": Boolean,
    "JoinedDate": Date,
    "MembershipType": String,
    "MembershipStartDate": Date,
    "MembershipEndDate": Date,
    "MembershipStatus": Boolean,
    "AddOn1": String,
    "MobileNum": String
};


//module.exports = mongoose.model('users', userSchema);
module.exports = mongoose.model('tbl_userSchema', tbl_userSchema); 
