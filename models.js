<<<<<<< HEAD
var models = ['family.js', 'member.js', 'request.js', 'drawing.js'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};
=======
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  "title": String,
  "date": Date,
  "summary": String,
  "image": String
});

exports.Project = Mongoose.model('Project', ProjectSchema);




//db.usercollection.insert({ "title" : "testimage1", "date" : "5/7/2014", "user" : "anh", "image" : "https://scontent-a-iad.xx.fbcdn.net/hphotos-ash3/t1.0-9/1462856_10201761053647891_278729930_n.jpg", "song" : "" })
>>>>>>> master
