var express = require('express');
var router = express.Router();
var passport = require('passport');
var winston = require('winston');
var mq_client = require('../rpc/client');

router.post('/', function(req, res, next) {
	var json_responses = '';
	var username = req.body.username;
	var password = req.body.password;
	var msg_payload = { "username": username, "password": password };
		
	passport.authenticate('local.signin', function(err, user, info) {
	     if (err) {
	    	 json_responses = {'statusCode': '401', 'error': 'Server Timeout'};
	 	   	res.send(json_responses); 
	     //return next(err); 
	   }else{
	   if (user === false) {
	   	json_responses = {'statusCode': '400', 'error': req.flash('signinErrorMessage')};
	   	res.send(json_responses);
	   } else {
		json_responses = {'statusCode': '200'};
	   	res.send(json_responses);
	   }}
	 })(req,res,next);
	winston.debug("Signin for User: "+username);
});


module.exports = router;
