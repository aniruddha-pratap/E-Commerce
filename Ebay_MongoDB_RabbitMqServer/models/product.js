var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = require('../services/mongooseConnect');

var tempConn = conn.exportConnection();
conn.pushBackConnection(tempConn);

var productSchema = new Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	sellerInfo: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: Number, required: true},
	date: { type: Date, default: Date.now },
	type: {type: String, required: true},
});


module.exports = tempConn.model('Product', productSchema);