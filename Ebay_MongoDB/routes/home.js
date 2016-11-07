var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next){
	console.log('username'+ req.session.username);
	var json_responses = '';
	var msg_payload = {"username": req.session.username};
	
	mq_client.make_request('home_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}else{
		if(results.code === '200'){
			console.log("Product"+results.value);
			json_responses = {'statusCode': '200', 'product': results.value, 'date':req.session.lastDate, 'username':req.session.username};
			res.send(json_responses);
		}else{
			json_responses = {'statusCode': '400'};
			res.send(json_responses);
		}}
	});	
});


module.exports = router;
