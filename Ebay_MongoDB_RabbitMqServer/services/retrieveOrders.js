var Product = require('../models/product');
var Order = require('../models/order');

function retrieveOrders_request(msg, callback){
	
	var res = {};
	console.log("In show my orders request:"+ msg.username);
	Order.find({addedBy: msg.username})
	.populate('product')
	.exec(function(err, order){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = order;
			console.log("Orders "+order);
			callback(null, res);
		}
	});
}

exports.retrieveOrders_request = retrieveOrders_request;