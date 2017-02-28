var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('layoutSideMenu', { title: 'Express' });
});

module.exports = router;