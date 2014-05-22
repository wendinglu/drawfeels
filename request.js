var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var requestSchema = new Schema({
		From: Schema.Types.ObjectId,
		To: Schema.Types.ObjectId,
		Description: String,
		Status: Date,
		Seen: Boolean
	});
	mongoose.model("requestSchema",requestSchema);
	mongoose.connect( 'mongodb://localhost/express-request' );
};
