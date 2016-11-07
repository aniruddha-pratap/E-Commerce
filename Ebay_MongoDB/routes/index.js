var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var mq_client = require('../rpc/client');

/* GET home page. */
router.get('/', function(req, res, next) {
	var json_responses = '';
	var msg_payload = {};
	
	mq_client.make_request('index_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			console.log(err);
			res.end('Server Timeout');
		}else{
		if(results.code === '200'){
			console.log(results.value);
			ejs.renderFile('./views/index.ejs', { data: results.value } , function(err, result) {
		        // render on success
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
		    });
		}}
	});	
});

module.exports = router;
