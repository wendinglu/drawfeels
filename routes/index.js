var mongoose = require('mongoose');
var familySchema = mongoose.model('familySchema');


var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/mongoosetest', function(req, res) {
  res.render('mongoosetest', { title: 'mongoosetest' });
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


router.get('/mongoosetestdisplay', function ( req, res ) {
    familySchema.find( function ( err, familySchema){
    res.render( 'mongoosetestdisplay', {
      title : 'Express Family Example',
      family : familySchema
    });
  });
});



router.post('/create', function(req, res) {
  new familySchema({
    Name : req.body.names,
    Pword : req.body.pword,
    Username : req.body.username,

  }).save( function( err, familySchema){
    if (err) return console.error(err);
    console.log("saved");
    res.redirect( '/mongoosetestdisplay' );
  });
});

module.exports = router;