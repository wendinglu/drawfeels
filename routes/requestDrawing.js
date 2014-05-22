var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var familySchema = mongoose.model('familySchema');
var drawingSchema = mongoose.model('drawingSchema');
var requestSchema = mongoose.model('requestSchema');


/* GET home page. */
router.get('/', function(req, res) {
  var current_user = {'Name': 'Wending'}
  var family_members = [{'img' :'images/image2.jpg'}, {'img': 'images/image3.jpg'}, {'img': 'images/image4.jpg'}, {'img': 'images/image5.jpg'}, {'img': 'images/image1.jpg'}];
  res.render('requestDrawing', { title: 'Express', 'user': current_user, 'members': family_members });
});

router.post('/postRequest', function(req, res) {
  
});

module.exports = router;

