var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys');
var mongoose = require('mongoose');
var Family = mongoose.model('familySchema');
var Drawing = mongoose.model('drawingSchema');
var Member = mongoose.model('memberSchema');
var Request = mongoose.model('requestSchema');
var Conversation = mongoose.model('conversationSchema');


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
  var convoID = req.session.convoID;
  var background = req.body.img; 
  var rcpnt = req.body.recipient;
  var description = req.body.description;
  var request = req.body.request;

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
        'description': description,
        'request': request,
        'convoID' : convoID
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
  //if there is a collaboration id, find that collaboration and update
  var img = req.body.image;
  var imgData = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(imgData, 'base64');
  var imgName = token();
  var convoID = req.body.convoID;

  fs.writeFile('./public/images/drawings/' + imgName + '.png', buf);
  // created at Date
  var date = new Date().getTime();
  var recipients = req.body.sendTo.split(','); 

  var properties = {
    from: req.session.member._id,
    to: recipients,
    url: 'images/drawings/' + imgName + '.png' ,
    description: req.body.description,
    created: date
  }

  if (req.body.request)
    properties['request'] = req.body.request
  
  var newDrawing = new Drawing(properties);

  newDrawing.save( function( err, drawing){
    if (err) res.send(err,400);
    else {
      console.log(newDrawing);
      if (convoID) { //is collaboration
        var participants = drawing.to.slice(0, drawing.to.length);
        participants.push(drawing.from);
        Conversation.findByIdAndUpdate(
          convoID, 
          {$set: {dummy: null}, $push: {images: drawing._id}, $addToSet: {members: {$each: participants}}},
          {safe: true, upsert: true},
          function(err, conversation) {
            if (err) {
              console.log("Could not update new conversation")
              res.send(err, 400)
            } else {
              console.log(conversation);
              res.redirect('/stream');
            }
          }
        );
      } else {
        var participants = drawing.to.slice(0, drawing.to.length);
        participants.push(drawing.from);
        var newConvo = new Conversation({
          members: participants,
          images: [drawing._id]
        });
        newConvo.save( function(err, conversation){
          if (err) {
            console.log("Could not save new conversation")
            res.send(err, 400)
          } else {
            console.log("conversation created");
            console.log(conversation);
            if (drawing.request) {
              Request.findByIdAndUpdate(
                drawing.request,
                {$set: {nonsense: null}, $pull: {active: req.session.member._id}},
                {safe: true, upsert: true},
                function(err, model) {
                  if (err) {
                    console.log("Could not update request")
                    res.send(err, 400)
                  }
                  else res.redirect('/stream');
                }
              );
            }
            else res.redirect('/stream');
          } 
        });
      }
    }
  });  
});


module.exports = router;