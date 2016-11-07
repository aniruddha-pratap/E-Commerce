var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next){
	var json_responses = '';
	console.log(req.session.username);
	console.log(req.body.type);
	if(req.session.username){
		var msg_payload = {"username": req.session.username, "name": req.body.name, "description": req.body.description, "price": req.body.price, "quantity": req.body.quantity, "type":req.body.type};
		
		mq_client.make_request('productAdvt_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				throw err;
				json_responses = {'statusCode': '400', 'error':'Snap!Something went wrong'};
				res.send(json_responses);
			}else{
			if(results.code === '200'){
				json_responses = {'statusCode': '200', 'error':'Posted Successfully'};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400', 'error':'Snap!Something went wrong'};
				res.send(json_responses);
			}}
		});
	}
	else{
		json_responses={'statusCode': '400', 'error':'You are not signed in'};
		res.send(json_responses);
	}
	winston.debug("Posted for User: "+req.session.username);
});


router.get('/', function(req, res, next){
	var json_responses = '';
	if(req.session.username){
		json_responses = {'username': req.session.username};
		res.send(json_responses);
	}	
});

module.exports = router;
