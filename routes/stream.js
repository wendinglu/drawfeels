var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Family = mongoose.model('familySchema');
var Drawing = mongoose.model('drawingSchema');
var Request = mongoose.model('requestSchema')

/* GET home page. */
router.get('/', function(req, res) {
  //want a list 

  Request.find({to: req.session.member._id}, function(err, requestsFound){
    if (err) return console.log(err);
    console.log(requestsFound);
    Drawing.find( function ( err, drawingsFound){
      if (err) return console.log(err);
      res.render( 'stream', {
        title : 'Picture Stream',
        drawings : drawingsFound,
        requests: requestsFound
      });
    });
  });

  
});

module.exports = router;