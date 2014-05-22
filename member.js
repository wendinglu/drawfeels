var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var memberSchema = new Schema({
		Name: String,
		Picture: String,
		Role: String
	});
	mongoose.model("memberSchema",memberSchema);
	mongoose.connect( 'mongodb://localhost/express-member' );
};
