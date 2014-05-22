mongoose = require('mongoose');
familySchema = mongoose.model('familySchema');

exports.login = (user, pass, callback) ->
  familySchema.findOne {username: user}, (error, obj) ->
    if (obj == null)
      callback('user-not-found');
    else if (obj.pass == pass)
      callback(null, obj);
    else
      callback('invalid-password');