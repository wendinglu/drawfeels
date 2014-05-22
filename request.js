var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module.exports = function() {
	var requestSchema = new Schema({
		from: Schema.Types.ObjectId,
		to: Schema.Types.ObjectId,
		description: String,
		status: Date,
		seen: Boolean
	});
	mongoose.model("requestSchema",requestSchema);
//	mongoose.connect( 'mongodb://localhost/express-request' );
//};
