var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys');

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var current_user = {'img': 'images/image1.jpg'}
  var family_members = [{'img' :'images/image2.jpg'}, {'img': 'images/image3.jpg'}, {'img': 'images/image4.jpg'}, {'img': 'images/image5.jpg'}, {'img': 'images/image1.jpg'}];
  res.render('draw', {
      title: 'Draw Something!',
      "members": family_members,
      "user": current_user
    });
});

router.post('/', function(req, res) {
  var current_user = {'img': 'images/image1.jpg'}
  var img = req.body.img;
  var rcpt = req.body.recipient;
  var detail = req.body.detail;

  res.render('draw', {
    title: 'Draw Something!',
    "img": img,
    "recipients": rcpt,
    "detail": detail,
    "user": current_user
  })


});

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

var token = function() {
    return rand() + rand(); // to make it longer
};

router.post('/sendImage', function(req, res) {
  var img = req.body.image;
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  

  var imgName = token();
  fs.writeFile('./public/images/drawings/' + imgName + '.png', buf);
  
});


module.exports = router;