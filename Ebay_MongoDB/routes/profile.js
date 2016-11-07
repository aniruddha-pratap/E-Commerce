var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

router.get('/', function(req,res,next){
	var json_responses = '';
	console.log("Inside view Profile");
	var msg_payload = {"username": req.session.username};
	console.log(msg_payload);
	mq_client.make_request('retrieveProfile_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}else{
		if(results.code === '200'){
			console.log("User " + results.value);
			json_responses = {'statusCode': '200', 'user': results.value, 'username':req.session.username};
			res.send(json_responses);
		}else{
			json_responses = {'statusCode': '400'};
			res.send(json_responses);
		}}
	});
});

router.post('/', function(req, res, next){
	var json_responses = '';
	var msg_payload = {"username": req.session.username, "firstname": req.body.firstname, "lastname": req.body.lastname, "phoneNumber": req.body.phoneNumber, "dob": req.body.dob, "address": req.body.address};
	
	mq_client.make_request('updateProfile_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		if(results.code === '200'){
			console.log("User " + results.value);
			json_responses = {'statusCode': '200', 'error':'Update Successfull!'};
			res.send(json_responses);
		}else{
			json_responses = {'statusCode': '400', 'error':'Snap!Something went wrong'};
			res.send(json_responses);
		}
	});
});

module.exports = router;
