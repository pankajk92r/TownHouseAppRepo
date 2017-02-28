var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoOp = require("./models/mongo");
var router = express.Router(); 
var routes = require('./routes/index'); 
var autoIncrement = require("mongodb-autoincrement");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/assets", express.static("assets"));
app.use("/public", express.static("public"));
app.use(session({ secret: 'ssshhhhh' }));
var sess;

router.route("/login")
    .post(function (req, res) {
        sess = req.session;
        var response = {};
        mongoOp.users.findOne({ "Email": req.body.Email, "Password": req.body.Password }, function (err, data) {
            if (data == null) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data }; 
                sess.loginData = data;
            }
            res.json(response);
        });
    })
     

router.route("/users")
    .get(function (req, res) {
        var response = {};
        mongoOp.users.findOne({}, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var db = new mongoOp.users();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.

        db.UserName = req.body.UserName
        db.Email = req.body.Email;
        db.Password = req.body.Password
        db.City = req.body.City
        db.Country = req.body.Country
        db.Photo = req.body.Photo
        db.VerifiedUser = req.body.VerifiedUser
        db.JoinedDate = new Date(req.body.JoinedDate)
        db.MembershipType = req.body.MembershipType
        db.MembershipStartDate = new Date(req.body.MembershipStartDate)
        db.MembershipEndDate = new Date(req.body.MembershipEndDate)
        db.MembershipStatus = req.body.MembershipStatus
        db.AddOn1 = req.body.AddOn1
        db.MobileNum = req.body.MobileNum
        // Hash the password using SHA1 algorithm.

        //db.userPassword = require('crypto')
        //                      .createHash('sha1')
        //                      .update(req.body.password)
        //                      .digest('base64');

        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": "Error adding data" };
            } else {
                response = { "error": false, "message": "Data added" };
            }
            res.json(response);
        });
    });

router.route("/reviewrating")
    .get(function (req, res) {
        sess = req.session;
        var response = {};
        if (sess.loginData) {
            var TableData = {};
            mongoOp.users.find({}, function (err, data) {
                TableData = data; 
                response = { "error": false, "message": sess.loginData, "TableData": TableData }; 
                res.json(response);
            });
           
        } else {
            response = { "error": true, "message": "Invalid Login" };
            res.json(response);
        } 
    })


router.route("/categorysubmngmt")
    .get(function (req, res) {
        sess = req.session;
        var response = {};
        if (sess.loginData) {
            var TableData = {};
            //mongoOp.ServiceProviderSubCat.find().populate('MainCategory').exec(function (err, data) {
            //    TableData = data;
            //    response = { "error": false, "message": sess.loginData, "TableData": TableData };
            //    res.json(response);
            //});

            mongoOp.ServiceProviderCategory.find({},function (err, data) {
                TableData = data;
                response = { "error": false, "message": sess.loginData, "TableData": TableData };
                res.json(response);
            });

        }
        else {
            response = { "error": true, "message": "Invalid Login" };
            res.json(response);
        }
    })
    .post(function (req, res) {
        
        var response = {}; 
        var autoId = 0; 
        var instance = new mongoOp.ServiceProviderCategory; 
        mongoOp.ServiceProviderCategory.findOne({ "CategoryName": req.body.CategoryName }, function (error, result) {
            if (result == null) {
                // Add strict validation when you use this in Production. 
                autoIncrement.getNextSequence(instance.db, "counters", function (err, autoIndex) {
                autoId = autoIndex; 
                instance.ServiceCatID = autoIndex;
                instance.CategoryName = req.body.CategoryName;
                instance.ActiveCatFlag = true;
                instance.ServiceProviderSubCat.push(new mongoOp.ServiceProviderSubCat({ SubCatID: autoIndex, "SubCategoryName": req.body.SubCategoryName }));
                instance.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = { "error": true, "message": "Error adding data" };
                    } else {
                        response = { "error": false, "message": "Data added" };
                    }
                    res.json(response);
                })
            })
        }
            else
            {
                mongoOp.ServiceProviderSubCat.findOne({
                    "SubCategoryName": req.body.SubCategoryName
                }, function (e, r) {
                    if (r == null) {
                        autoIncrement.getNextSequence(instance.db, "counters", function (err, autoIndex) { 
                         //   var instance = new mongoOp.ServiceProviderCategory;
                            var newscategory = new mongoOp.ServiceProviderSubCat({ SubCatID: autoIndex, "SubCategoryName": req.body.SubCategoryName });
                            mongoOp.ServiceProviderCategory.update({ "ServiceCatID": result._doc.ServiceCatID },
                            { $push: {
                                "ServiceProviderSubCat": newscategory
                                 }
                            },
                            {upsert: true }, function (err,data) {
                          
                            if (err) {
                                response = { "error": true, "message": "Error in subcategory adding" };
                            } else {
                                response = { "error": false, "message": "Data added" };
                            }
                            res.json(response);
                        })
                    })
                    }
                    else {
                        response = { "error": true, "message": "Subcategory already exists." };
                        res.json(response);
                    }
                })
            }

        })
    });


router.route("/UpdateSubCategory").post(function (req, res) { 
    var catid = req.body.catid;
    var oldname = req.body.oldname;
    var modifiedName = req.body.modifiedName;
    var response = {};
    mongoOp.ServiceProviderCategory.findOne({ "ServiceProviderSubCat.SubCategoryName": modifiedName },
        function (error, result) {
            if (result == null)
            {
                mongoOp.ServiceProviderCategory.update({ "ServiceProviderSubCat.SubCatID": catid}, { $set: { "ServiceProviderSubCat.$.SubCategoryName": modifiedName }}, function (err, data) {

                    if (err) {
                        response = { "error": true, "message": "Error in category adding" };
                    } else {
                        response = { "error": false, "message": "Data added" };
                    }
                    res.json(response);
                });
                }
                else
                {
                    response = { "error": true, "message": "Category already exists." };
                    res.json(response);
                }
    })

});
router.route("/UpdateMainCategory").post(function (req, res) {
    var catid = req.body.catid;
    var oldname = req.body.oldname;
    var modifiedName = req.body.modifiedName;
    var response = {};
    mongoOp.ServiceProviderCategory.findOne({ "CategoryName": modifiedName },
        function (error, result) {
            if (result == null) {
                mongoOp.ServiceProviderCategory.update({ "ServiceCatID": catid }, { $set: { "CategoryName": modifiedName } }, function (err, data) {

                    if (err) {
                        response = { "error": true, "message": "Error in category adding" };
                    } else {
                        response = { "error": false, "message": "Data added" };
                    }
                    res.json(response);
                });
            }
            else {
                response = { "error": true, "message": "Category already exists." };
                res.json(response);
            }
        })
});

//Route declaration
var loginApi = require('./routes/login');
var Index = require('./routes/index');
var categorymngt = require('./routes/category-subcategory-management'); 
var reviewrating = require('./routes/review-rating');
var adminbidlist = require('./routes/admin-bid-listing-report');
var adminchat = require('./routes/admin-chat-message');
var admineditcist = require('./routes/admin-edit-cost');
var admineditform = require('./routes/admin-edit-form');
var adminrevrating = require('./routes/admin-review-rating');
var adminsearchcost = require('./routes/admin-search-cost');
var error = require('./routes/error');
var searchactivity = require('./routes/search-ativities');
var searchservprovider = require('./routes/searchserviceprovider');
var serviceprovform = require('./routes/services-provider-form');
var leftpanel = require('./routes/layoutSideMenu');
//Register Route
app.use("/", loginApi);
app.use("/layoutSideMenu", leftpanel); 
app.use("/index", Index);
app.use("/login", loginApi);
app.use("/review-rating", reviewrating);
app.use("/category-subcategory-management", categorymngt);
app.use("/admin-bid-listing-report", adminbidlist);
app.use("/admin-chat-message", adminchat);
app.use("/admin-edit-cost", admineditcist);
app.use("/admin-edit-form", admineditform);
app.use("/admin-review-rating", adminrevrating);
app.use("/admin-search-cost", adminsearchcost);
app.use("/error", error);
app.use("/search-ativities", searchactivity);
app.use("/searchserviceprovider", searchservprovider);
app.use("/services-provider-form", serviceprovform);
app.use("/categorymanagement", categorymngt); 
app.use('/', router); 

module.exports = app;
