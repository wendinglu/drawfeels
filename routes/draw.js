var express = require('express');
var router = express.Router();

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

module.exports = router;