var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next){
	var json_responses = '';
	var msg_payload = {"username": req.session.username};
	var cardNumber = req.body.cardNumber;
	console.log('Card Number:'+ cardNumber);
	if(cardNumber.length == '16' && !isNaN(cardNumber)){
		console.log("Inside If");
		mq_client.make_request('checkout_request',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
			}else{
			if(results.code === '200'){
				json_responses = {'statusCode': '200'};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400'};
				res.send(json_responses);
			}}
		});
	}
	else{
		json_responses = {statusCode: '400', 'error':'Credit Card should be 16 digit number!'};
		res.send(json_responses);
	}
	winston.debug("Checkout from cart for User: "+req.session.username);
});

module.exports = router;
