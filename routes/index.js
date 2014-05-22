var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var familySchema = mongoose.model('familySchema');

var fs = require('fs');
var sys = require('sys');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', user: req.session.user });
});

/* GET home page. */
router.get('/mongoosetest', function(req, res) {
  res.render('mongoosetest', { title: 'mongoosetest' });
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
    name : req.body.names,
    pword : req.body.pword,
    username : req.body.username,
  }).save( function( err, familySchema){
    if (err) return console.error(err);
    console.log("saved");
    res.redirect( '/mongoosetestdisplay' );
  });
});

module.exports = router;