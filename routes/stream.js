var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Family = mongoose.model('familySchema');
var Drawing = mongoose.model('drawingSchema');
var Request = mongoose.model('requestSchema');
var Member = mongoose.model('memberSchema');

var renderMembers = function(id, callback) {
  console.log("finding #{id}");
  Family.findOne({_id: id}, function(err, family){
    if (err)
      callback(err, null)
    else
      Member.where({_id: {$in: family.members}}).exec(callback);
  });
}

var renderDrawings = function(id, callback) {
  Family.findOne({_id: id}, function(err, family){
    if (err)
      callback(err, null)
    else
      Drawing.where({from: {$in: family.members}}).sort('-created').exec(callback);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.family || !req.session.member)
    res.redirect('/')
  else {
    Request.find({to: req.session.member._id, active: req.session.member._id}, function(err, requestsFound){
      if (err) return console.log(err);
      console.log(requestsFound);

      renderMembers(req.session.family._id, function(err, members){
        if (err) return console.log(err);
        renderDrawings(req.session.family._id, function(err, drawings){
          if (err) return console.log(err);
          var membersTable = {}
          members.forEach(function(value, index, arr){
            membersTable[value._id] = value;
          });
          res.render( 'stream', {
            title : 'Picture Stream',
            user: req.session.member,
            drawings : drawings,
            requests: requestsFound,
            membersTable: membersTable
          });

        });
      });
    });
  }
});

module.exports = router;