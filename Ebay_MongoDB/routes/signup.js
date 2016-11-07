var express = require('express');
var router = express.Router();
var winston = require('winston');
var passport = require('passport');

router.post('/', function(req, res, next) {
	var json_responses = '';
	 passport.authenticate('local.signup', function(err, user, info) {
	      if (err) {
	      return next(err); 
	    }else{
	    if (user == false) {
	    	json_responses = {'statusCode': '400', 'error': req.flash('signupErrorMessage')};
	    	res.send(json_responses);
	    } else {
	    	json_responses = {'statusCode': '200'};
    		res.send(json_responses);
	    }}
	  })(req,res,next);
	 winston.debug("Signup for User: "+req.param("username"));
});
    
module.exports = router;