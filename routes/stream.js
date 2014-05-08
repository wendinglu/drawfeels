var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('drawingcollection');
  collection.find({},{},function(e,docs){
    console.log(docs);
    res.render('stream', {
      "drawings" : docs,
      title: 'Stream'
    });
  });
});

module.exports = router;