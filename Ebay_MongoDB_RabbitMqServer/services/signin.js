var User = require('../models/user');
var lastLoggin = '';
var today = new Date();

function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	var json_responses ='';
	User.findOne({'username': msg.username}, function(err, user){
		if(err){
			throw err;
		}
		if(!user){
			res.code = "402";
			res.value = "User not found";
			callback(null, res);
		}else{
			if(!user.validPassword(msg.password)){
				res.code = "401";
				res.value = "Incorrest Password";
				callback(null, res);
			}else{
				lastLoggin = user.date;
				console.log(lastLoggin);
				user.update({'username': msg.username}, {$set : {'date': today}}, function(err, result){
					if(err){
						throw err;
					}else{
						res.code = "200";
						res.value = user;
						res.date = lastLoggin;
						console.log("username "+user.username);
						callback(null, res);
					}
				});
			}
		}
	});
	
}

exports.handle_request = handle_request;