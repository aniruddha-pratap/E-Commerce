var Cart = require('../models/cart');
var Product = require('../models/product');

function handle_request(msg, callback){
	
	var res = {};
	console.log("In cart add request:"+ msg.username + msg.productId);
		
	Cart.findOne({product: msg.productId, addedBy: msg.username}, function(err, cart){
		if(err){
			throw err;
		}else{
			if(cart){
				Product.findOne({_id: msg.productId}, function(err, product){
					if(err){
						throw err;
					}else{
						console.log('In Product');
						if(product.quantity > cart.quantity){
							cart.quantity = cart.quantity + 1;
							cart.save(function(err) {
					            if (err){
					              console.log('Error in adding to Cart: '+err);  
					              throw err;  
					            }else{
					            	res.code = "200";
					    			res.value = cart;
					    			console.log("username "+cart.product);
					    			callback(null, res);
					            }
							});
						}else{
							res.code = "200";
			    			res.value = cart;
			    			console.log("username "+cart.product);
			    			callback(null, res);
						}
					}
				});
			}else{
				console.log('In new cart');
				var newCart = new Cart();
				newCart.product = msg.productId;
				newCart.addedBy = msg.username;
				newCart.quantity = newCart.quantity + 1;
				newCart.save(function(err) {
		            if (err){
		              console.log('Error in adding to Cart: '+err);  
		              throw err;  
		            }else{
		            	res.code = "200";
		    			res.value = newCart;
		    			console.log("username "+newCart.product);
		    			callback(null, res);
		            }
				});
			}
			
		}
	});
}

function showCart_request(msg, callback){
	
	var res = {};
	console.log("In cart retrieve request:"+ msg.username);
	
	Cart.find({addedBy: msg.username})
	.populate('product')
	.exec(function(err, cart){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = cart;
			console.log("username "+cart);
			callback(null, res);
		}
	});
}

function removeCart_request(msg, callback){
	
	var res = {};
	console.log("In cart remove request:"+ msg.username + msg.productId);
	
	Cart.findOne({product: msg.productId, addedBy: msg.username}, function(err, cart){
		if(err){
			throw err;
		}else{
			console.log("Found User");
			if(cart){
				console.log("Found cart");
				if(cart.quantity>1){
					cart.quantity = cart.quantity - 1;
					cart.save(function(err) {
				           if (err){
				             console.log('Error removing from Cart: '+err);  
				             throw err;  
				           }else{
				        	   res.code = "200";
				        	   console.log("Item removed from cart");
				    		   callback(null, res);
				           }
				   });
				}else{
					cart.remove(function(err) {
				           if (err){
				             console.log('Error removing from Cart: '+err);  
				             throw err;  
				           }else{
				        	   res.code = "200";
				        	   console.log("Cart Deleted");
				    		   callback(null, res);
				           }
				   });
				}
			}
		}
	});
}

exports.handle_request = handle_request;
exports.showCart_request = showCart_request;
exports.removeCart_request = removeCart_request;