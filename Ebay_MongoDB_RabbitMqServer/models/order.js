var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var conn = require('../services/mongooseConnect');

var tempConn = conn.exportConnection();
conn.pushBackConnection(tempConn);

var orderSchema = new Schema({
	product: {type: Schema.ObjectId, ref:'Product'},
	addedBy: {type: String},
	quantity: {type: Number, required: true, default:0},
	date: {type: Date, default: Date.now}
});

module.exports = tempConn.model('Order', orderSchema);