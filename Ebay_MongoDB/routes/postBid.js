var express = require('express');
var router = express.Router();
var winston = require('winston');
var mq_client = require('../rpc/client');

router.get('/', function(req,res,next){
	var json_responses = '';
	var msg_payload = {"username": req.session.username};
	
	mq_client.make_request('showBiddingItems_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}else{
		if(results.code === '200'){
			console.log("cart"+results.value);
			json_responses = {'statusCode': '200', 'product': results.value, 'username': req.session.username};
			res.send(json_responses);
		}else{
			json_responses = {'statusCode': '400'};
			res.send(json_responses);
		}}
	});

});

router.post('/', function(req, res, next){
	var json_responses = '';
	console.log(req.body.bidAmount);
	console.log(req.body.id);
	var msg_payload = {"id": req.body.id,"bidAmount": req.body.bidAmount,"username": req.session.username};
	if(req.body.bidAmount != '0'){
		mq_client.make_request('postBid_queue',msg_payload, function(err,results){
			console.log(results);
			if(err){
				throw err;
			}
			if(results.code === '200'){
				json_responses = {'statusCode': '200', 'error':'Bid Posted Successfully!'};
				res.send(json_responses);
			}else{
				json_responses = {'statusCode': '400'};
				res.send(json_responses);
			}
		});
	}
	else{
		json_responses = {'statusCode': '400','error':'Please provide the bid amount'};
		res.send(json_responses);
	}
	winston.debug("Bidding User: "+req.session.username+" Bidding Amount: "+req.param("bidAmount")+" Product Id: "+req.param("id"));
});

module.exports = router;
