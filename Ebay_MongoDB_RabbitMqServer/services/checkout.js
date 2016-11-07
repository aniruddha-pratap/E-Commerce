var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var newOrder = [];

function checkout_request(msg, callback){
	
	var res = {};
	console.log("In checkout request:"+ msg.username);
	
	Cart.find({addedBy: msg.username}, function(err, cart){
		console.log("Inside Cart");
		if(err){
			throw err;
		}else{
			console.log("Cart "+cart);
			console.log("Cart Length"+cart.length);
			for(var i = 0;i<cart.length;i++){
				(function(i){
					console.log("Inside for loop");
					newOrder[i] =  new Order();
					newOrder[i].product = cart[i].product;
					newOrder[i].addedBy = cart[i].addedBy;
					console.log("Cart Qty "+cart[i].quantity);
					newOrder[i].quantity = cart[i].quantity;
					newOrder[i].save(function(err, resp){
						console.log('Inside order save');
						if(err){
							throw err;
						}else{
							console.log("Product Update");
							Product.update({"_id": cart[i].product}, {$inc: {quantity: -cart[i].quantity}}, function(err, numAffected){
								if(err){
									throw err;
								}else{
									cart[i].remove({},function(err,resp) {
	                                     if(err){
	                                       console.log('Error removing from Cart: '+err);  
	                                       throw err;  
	                                     }
									});
								}
							});
						}
					});
				})(i);
			}
			res.code = "200";
			callback(null, res);
		}
	});
}

exports.checkout_request = checkout_request;