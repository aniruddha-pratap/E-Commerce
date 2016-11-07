var User = require('../models/user');

function updateProfile_request(msg, callback){
	
	var res = {};
	console.log("In update profile request:"+ msg.username);
	User.update({ username: msg.username }, { $set: { "firstname": msg.firstname, "lastname": msg.lastname, "dob": msg.dob, "contactNumber": msg.phoneNumber, "address": msg.address } }, function(err, user){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = user;
			console.log("User " + user);
			callback(null, res);
		}
	});
}

function retrieveProfile_request(msg, callback){
	
	var res = {};
	console.log("In reteieve profile request:"+ msg.username);
	User.findOne({username: msg.username}, function(err, user){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = user;
			console.log("User " + user);
			callback(null, res);
		}
	});
}

exports.updateProfile_request = updateProfile_request;
exports.retrieveProfile_request = retrieveProfile_request;