var User = require('../models/user');

function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	var json_responses ='';
	User.findOne({'username': msg.username}, function(err, user){
		if(err){
			throw err;
		}
		if(user){
			res.code = "401";
			res.value = "User exists";
			callback(null, res);
		}else{
			var newUser = new User();
			newUser.username = msg.username;
			newUser.password = newUser.encryptPassword(msg.password);
			newUser.firstname = msg.firstname;
			newUser.lastname = msg.lastname;
			newUser.date = new Date();
			newUser.dob = '';
			newUser.address = '';
	        newUser.contactNumber = '';
	        newUser.save(function(err) {
	         if (err){
	           console.log('Error in Saving user: '+err);  
	           throw err;  
	         }
	         console.log('User Registration succesful');
	         res.code = "200";
	         res.value = newUser;
	         callback(null, res);
	      });
		}
	});
	
}

exports.handle_request = handle_request;