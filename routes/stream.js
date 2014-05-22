var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var familySchema = mongoose.model('familySchema');
var drawingSchema = mongoose.model('drawingSchema');

/* GET home page. */
router.get('/', function(req, res) {
  drawingSchema.find( function ( err, drawingSchema){
    res.render( 'stream', {
      title : 'Picture Stream',
      drawings : drawingSchema
    });
  
  });
});

module.exports = router;