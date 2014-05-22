var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module.exports = function() {
	var memberSchema = new Schema({
		name: String,
		picture: String,
		role: String
	});
	mongoose.model("memberSchema",memberSchema);
//	mongoose.connect( 'mongodb://localhost/express-member' );
//};
