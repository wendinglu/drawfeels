var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module.exports = function() {
	var familySchema = new Schema({
		Name: String,
		Pword: String,
		Username: String,
		Members: [Schema.Types.ObjectId]
	});
	mongoose.model("familySchema",familySchema);
	mongoose.connect( 'mongodb://localhost/express-family' );
//};
