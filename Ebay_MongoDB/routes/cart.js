var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	var json_responses = '';
	var msg_payload = {"username": req.session.username};
	
	mq_client.make_request('showCart_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}else{
		if(results.code === '200'){
			console.log("cart"+results.value);
			json_responses = {'statusCode': '200', 'cart': results.value, 'username':req.session.username};
			res.send(json_responses);
		}else{
			json_responses = {'statusCode': '400'};
			res.send(json_responses);
		}
		}
	});
	
	/**if(req.session.username){
		console.log('Inside get');
				Cart.find({addedBy: req.session.username})
				.populate('product')
				.exec(function(err, cart){
					if(err){
						throw err;
					}else{
						json_responses = {'statusCode': '200', 'cart': cart};
						res.send(json_responses);
					}
				});
			
	}else{
		json_responses = {statusCode: '400'};
		res.send(json_responses);
	}**/
	
});

router.post('/', function(req, res, next) {
		var json_responses = '';
		console.log('in cart post');
		var msg_payload = { "productId": req.body.id, "username": req.session.username};
				
		mq_client.make_request('cart_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
			}
			if(results.code === '200'){
				json_responses = {'statusCode': '200'};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400'};
				res.send(json_responses);
			}
		});
		
		winston.debug("Add Items to cart for User: "+req.session.username+" Product Id: "+req.param("id"));
		
});

module.exports = router;
