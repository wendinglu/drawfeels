var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module.exports = function() {
	var drawingSchema = new Schema({
		from: Schema.Types.ObjectId,
		to: [Schema.Types.ObjectId], //changed the to field to array of ids
		url: String,
		description: String,
		created: Date,
		seen: Boolean
	});
	mongoose.model("drawingSchema",drawingSchema);
	//mongoose.connect( 'mongodb://localhost/express-drawing' );
//};
