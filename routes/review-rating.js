var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('review-rating', { title: 'test' });
});

module.exports = router;