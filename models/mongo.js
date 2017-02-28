
// configuration ===============================================================
var mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
var autoIncrement = require("mongodb-autoincrement");
mongoose.connect('mongodb://127.0.0.1:27017/TownHouseApp'); 	// connect to mongoDB database on modulus.io 



var mongoSchema = mongoose.Schema;
// create schema
var userSchema = {
    "UserName" : String,
    "Email" : String,
    "Password" : String,
    "City" : String,
    "Country" : String,
    "Photo" : String,
    "VerifiedUser" : Boolean ,
    "JoinedDate" : Date ,
    "MembershipType" : String,
    "MembershipStartDate" : Date ,
    "MembershipEndDate" : Date ,
    "MembershipStatus" : Boolean,
    "AddOn1" : String,
    "MobileNum" : String
};

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId; 





var ServiceProviderSubCatSchema = new mongoose.Schema({ 
    "SubCatID": Number, 
    "SubCategoryName": { type: String },
    "ActiveSubCatFlag": { type: Boolean, default: true }, 
});

var ServiceProviderCategorySchema = new mongoose.Schema({ 
    "ServiceCatID": { type: Number },
    "CategoryName": { type: String },
    "ActiveCatFlag": { type: Boolean, default: true },
    "ServiceProviderSubCat": [ServiceProviderSubCatSchema]
    //  "MainCat": { type: ObjectId, ref: 'ServiceProviderSubCat' },
});

var counterschema =
    {
        "_id": String,
        "sequence_value": Number

    }



//var CategoriesSchema = new Schema({
//    year: { type: Number, index: true },
//    make: { type: String, index: true },
//    model: { type: String, index: true },
//    body: { type: String, index: true }
//});

//var ColorsSchema = new Schema({
//    name: String,
//    id: String,
//    surcharge: Number
//});

//var MaterialsSchema = new Schema({
//    name: { type: String, index: true },
//    surcharge: String,
//    colors: [ColorsSchema]
//});

//var StyleSchema = new Schema({
//    name: { type: String, index: true },
//    surcharge: String,
//    materials: [MaterialsSchema]
//});

//var CatalogSchema = new Schema({
//    name: { type: String, index: true },
//    referenceId: ObjectId,
//    pattern: String,
//    categories: [CategoriesSchema],
//    description: String,
//    specifications: String,
//    price: String,
//    cost: String, 
//    thumbnailPath: String,
//    primaryImagePath: String,
//    styles: [StyleSchema]
//});

  
//var Catalog = mongoose.model('Catalog', CatalogSchema);
//var Color = mongoose.model('Colors', ColorsSchema);
//var Material = mongoose.model('Materials', MaterialsSchema);
//var Style = mongoose.model('Style', StyleSchema);

// create model if not exists.
var users = mongoose.model('users', userSchema);
var ServiceProviderCategory = mongoose.model('ServiceProviderCategory', ServiceProviderCategorySchema); 
var ServiceProviderSubCatS = mongoose.model('ServiceProviderSubCat', ServiceProviderSubCatSchema); 
var counters = mongoose.model('counters', counterschema); 
module.exports = {
    users: users,
    ServiceProviderCategory: ServiceProviderCategory,
    ServiceProviderSubCat: ServiceProviderSubCatS,
    counters: counters
    //,
    //Catalog: Catalog,
    //Color: Color,
    //Material: Material,
    //Style: Style
}

//var ServiceProvider = {
//    "UserID" : String,
//    "UserName" : String,
//    "Email" : String,
//    "Password" : String,
//    "City" : String,
//    "Country" : String,
//    "Photo" : String,
//    "VerifiedUser" : Boolean ,
//    "JoinedDate" : Timestamp ,
//    "MembershipType" : String,
//    "MembershipStartDate" : Timestamp ,
//    "MembershipEndDate" : Timestamp ,
//    "MembershipStatus" : Boolean,
//    "AddOn1" : String,
//    "MobileNum" : String
//};
// create model if not exists.
//module.exports = mongoose.model('ServiceProvider', userSchema);

