var mongoose = require('mongoose');
var Schema = mongoose.Schema;

	var familySchema = new Schema({
		name: String,
		pword: String,
		username: String,
		members: [Schema.Types.ObjectId]
	});
	mongoose.model("familySchema", familySchema);
	mongoose.connect( 'mongodb://localhost/express-family' );