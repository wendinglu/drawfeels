var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  res.render('draw', {
      title: 'Draw Something!'
    });
});

module.exports = router;