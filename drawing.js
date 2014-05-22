var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module.exports = function() {
	var drawingSchema = new Schema({
		From: Schema.Types.ObjectId,
		To: Schema.Types.ObjectId,
		URL: String,
		Description: String,
		Created: Date,
		Seen: Boolean
	});
	mongoose.model("drawingSchema",drawingSchema);
	//mongoose.connect( 'mongodb://localhost/express-drawing' );
//};
