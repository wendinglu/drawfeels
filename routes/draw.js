var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys');
var mongoose = require('mongoose');
var Family = mongoose.model('familySchema');
var Drawing = mongoose.model('drawingSchema');
var Member = mongoose.model('memberSchema');
mongoose.connect( 'mongodb://localhost/express-family' );

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
      if (members){
        res.render('draw', {
          title: 'Draw Something!',
          'members': members,
          'user': current_user
        });
      } else {
        res.render('draw', {
          title: 'Draw Something!',
          'members': [],
          'user': current_user
        });
      } 
    }
  });
});

router.post('/', function(req, res) {
  var current_user = req.session.member;

  var background = req.body.img; 
  var rcpnt = req.body.recipient;
  var description = req.body.description;

  renderMembers(req.session.family._id, function(err, members){
    if(err)
      console.log (err);
    else {
      console.log ("Members found are:");
      console.log (members);
      members ? members : members = [];
      res.render('draw', {
        title: 'Draw Something!',
        'members': members,
        'user': current_user,
        'background': background,
        'rcpnt': rcpnt,
        'description': description
      });
    }
  });

});

var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
  return rand() + rand(); // to make it longer
};

router.post('/sendImage', function(req, res) {
  //converting the canvas image into a png and saving it on the server
  var img = req.body.image;
  var imgData = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(imgData, 'base64');
  var imgName = token();
  fs.writeFile('./public/images/drawings/' + imgName + '.png', buf);
  // created at Date
  var date = new Date().getTime();
  var recipients = req.body.sendTo.split(','); 
  
  var newDrawing = new Drawing({
    from: req.session.member._id,
    to: recipients,
    url: 'images/drawings/' + imgName + '.png' ,
    description: req.body.description,
    created: date
  });

  newDrawing.save( function( err, drawingSchema){
    if (err) return console.error(err);
    console.log(drawing);
    res.redirect('/stream');
  });

  
});


module.exports = router;