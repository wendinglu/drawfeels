var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema

var familySchema = new Schema({
  name: String,
  pword: String,
  username: String,
  members: [Schema.Types.ObjectId],
  nonsense: String
});
mongoose.model("familySchema",familySchema);

var requestSchema = new Schema({
  from: Schema.Types.ObjectId,
  to: [Schema.Types.ObjectId],
  description: String,
  status: Date,
  active: [Schema.Types.ObjectId]
});
mongoose.model("requestSchema",requestSchema);

var memberSchema = new Schema({
  name: String,
  picture: String,
  role: String
});
mongoose.model("memberSchema",memberSchema);

var drawingSchema = new Schema({
  from: Schema.Types.ObjectId,
  to: [Schema.Types.ObjectId], //changed the to field to array of ids
  url: String,
  description: String,
  created: Date,
  seen: Boolean,
  request: Schema.Types.ObjectId
});
mongoose.model("drawingSchema",drawingSchema);
  
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/express-family'
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
