var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next){
	var json_responses = '';
	if(req.session.username){
		var msg_payload = {"username": req.session.username};
		
		mq_client.make_request('retrievePosts_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
			}else{
			if(results.code === '200'){
				console.log("Product is "+results.value);
				json_responses = {'statusCode': '200', 'product':results.value, 'username':req.session.username};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400'};
				res.send(json_responses);
			}}
		});
	}
	else{
		json_responses = {'statusCode': '400'};
		res.send(json_responses);
	}
	winston.debug("Posted for User: "+req.session.username);
});

module.exports = router;
