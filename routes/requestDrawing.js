var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Member = mongoose.model('memberSchema');
var Family = mongoose.model('familySchema');
var Drawing = mongoose.model('drawingSchema');
var Request = mongoose.model('requestSchema');

var renderMembers = function(id, callback) {
  console.log("finding #{id}");
  Family.findOne({_id: id}, function(err, family){
    if (err)
      callback(err, null)
    else
      Member.where({_id: {$in: family.members}}).exec(callback);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var current_user = req.session.member;
  
  renderMembers(req.session.family._id, function(err, members){
    if(err)
      console.log (err);
    else {
      console.log ("Members found are:");
      console.log (members);
      res.render('requestDrawing', {
        title: 'Request a Drawing!',
        'members': members,
        'user': current_user
      });
    }
  });
});

router.post('/postRequest', function(req, res) {
  
});

module.exports = router;

