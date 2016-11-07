var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var conn = require('../services/mongooseConnect');

var tempConn = conn.exportConnection();
conn.pushBackConnection(tempConn);

var cartSchema = new Schema({
	product: {type: Schema.ObjectId, ref:'Product'},
	addedBy: {type: String},
	quantity: {type: Number, default:0}
});

module.exports = tempConn.model('Cart', cartSchema);