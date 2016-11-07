var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next) {
		var json_responses = '';
		
		var msg_payload = { "productId": req.body.id, "username": req.session.username};
		
		mq_client.make_request('removeCart_request',msg_payload, function(err,results){
			
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
		winston.debug("Decrease quantity from cart for User: "+req.session.username+" for Product Id: "+req.param("id"));
});

module.exports = router;
