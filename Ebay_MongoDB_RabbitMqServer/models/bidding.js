var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var conn = require('../services/mongooseConnect');

var tempConn = conn.exportConnection();
//conn.pushBackConnection(tempConn);

var bidSchema = new Schema({
	product: {type: Schema.ObjectId, ref:'Product'},
	bidOwner: {type: String},
	bidPrice: {type: Number},
	date: {type: Date, default: Date.now}
});

module.exports = tempConn.model('Bid', bidSchema);