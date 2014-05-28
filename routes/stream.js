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
/* GET home page. */
router.get('/', function(req, res) {

  Request.find({to: req.session.member._id, active: req.session.member._id}, function(err, requestsFound){
    if (err) return console.log(err);
    console.log(requestsFound);
    Drawing.find( function ( err, drawingsFound){
      if (err) return console.log(err);
      renderMembers(req.session.family._id, function(err, members){
        if(err)
          console.log (err);
        else {
          var membersTable = {}
          members.forEach(function(value, index, arr){
            membersTable[value._id] = value;
          });
          console.log(membersTable)
          res.render( 'stream', {
            title : 'Picture Stream',
            drawings : drawingsFound,
            requests: requestsFound,
            membersTable: membersTable
          });
        }
      });
    });
  });
});

module.exports = router;