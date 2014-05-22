#TODO database credentials here
crypto    = require('crypto')
MongoDB   = require('mongodb').Db
Server    = require('mongodb').Server
moment    = require('moment')

dbPort    = 27017
dbHost    = 'localhost'
dbName    = 'node-login'

# database connection TODO establish db
# db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
#   db.open (e, d) ->
#   if (e) {
#     console.log(e);
#   } else{
#     console.log('connected to database :: ' + dbName);
#   }
# })

accounts = db.collection('accounts');

exports.login = (user, pass, callback) ->
  accounts.findOne {user:user}, (error, obj) ->
    if (obj == null)
      callback('user-not-found');
    else if (obj.pass == pass)
      callback(null, obj);
    else
      callback('invalid-password');