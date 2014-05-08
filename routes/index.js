var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('drawingcollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	console.log("hi");

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var date = Date.now();
    var image = req.body.image;
    var song = req.body.song;
    var user = 1; //HACK, will change for support of multiple users

    // Set our collection
    var collection = db.get('drawingcollection');

    // Submit to the DB
    collection.insert({
      "title" : title,
      "date"  : date,
      "image" : image,
      "song"  : song,
      "user"  : user

    }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // If it worked, set the header so the address bar doesn't still say /adduser
          res.location("userlist");
          // And forward to success page
          res.redirect("userlist");
      }
    });
});

module.exports = router;