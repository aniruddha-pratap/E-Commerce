var express = require('express');
var router = express.Router();
var winston = require('winston');

/* GET home page. */
router.post('/', function(req, res, next) {
	winston.debug("Logout User: "+req.session.username);
	req.session.destroy();
	var json_response = {statusCode: '200'};
	res.send(json_response);
});

module.exports = router;
