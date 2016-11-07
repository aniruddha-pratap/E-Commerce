var Product = require('../models/product');

function home_request(msg, callback){
	
	var res = {};
	console.log("In home queue:"+ msg.username);
	Product.where('sellerInfo').ne(msg.username).where('quantity').ne(0).where('type').ne('Bid').exec(function(err, product){
		console.log("Inside Query");
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = product;
			console.log("Product " + product);
			callback(null, res);
		}
	});
}

function index_request(msg, callback){
	
	var res = {};
	Product.where('quantity').ne(0).exec(function(err, product){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = product;
			console.log("User " + product);
			callback(null, res);
		}
	});
}

exports.home_request = home_request;
exports.index_request = index_request;