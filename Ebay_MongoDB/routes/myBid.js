var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/', function(req, res, next){
	var json_responses = '';
	if(req.session.username){
		console.log('Inside Post');
		var msg_payload = {"username": req.session.username};
		
		mq_client.make_request('retrieveBids_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
			}else{
			if(results.code === '200'){
				console.log("bids "+results.value);
				json_responses = {'statusCode': '200', 'bid': results.value, 'username':req.session.username};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400'};
				res.send(json_responses);
			}}
		});
	}else{
		json_responses = {'statusCode': '400'};
		res.send(json_responses);
	}
});

module.exports = router;
