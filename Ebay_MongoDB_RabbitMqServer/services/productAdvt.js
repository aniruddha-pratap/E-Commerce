var Product = require('../models/product');

function productAdvt_request(msg, callback){
	
	var res = {};
	console.log("In sell products request:"+ msg.username);
	var newProduct = new Product();
	newProduct.name = msg.name;
	newProduct.description = msg.description;
	newProduct.sellerInfo = msg.username;
	newProduct.price = msg.price;
	newProduct.quantity = msg.quantity;
	if(msg.type === 'New'){
		newProduct.type = 'New';
	}else{
		newProduct.type = 'Bid';
	}
	newProduct.save(function(err){
		if(err){
			throw err;
		}else{
			res.code = "200";
			callback(null, res);
		}
	});
}

function retrievePosts_request(msg, callback){
	
	var res = {};
	console.log("In retieve posted products request:"+ msg.username);
	Product.where('sellerInfo').eq(msg.username).exec(function(err, product){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = product;
			callback(null, res);
		}
	});
}

exports.productAdvt_request = productAdvt_request;
exports.retrievePosts_request = retrievePosts_request;