var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mq_client = require('../rpc/client');

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	passReqToCallback: true
}, function(req, username, password, done){
	findOrCreateUser = function(){
		var msg_payload = { "username": username, "password": password, "firstname":req.body.firstname, "lastname":req.body.lastname };
		console.log("In passport signup Request = UserName:"+ username+" "+password+" "+req.body.lastname+" "+req.body.firstname);
		
		mq_client.make_request('signup_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				return done(err);
			}
			if(results.code === '401'){
				return done(null, false, req.flash('signupErrorMessage','Username already exists!'));
			}else{
				console.log("User "+ results);
				req.session.username = username;
				return done(null, results.value);
			}
						  
		});
	};
	process.nextTick(findOrCreateUser);
	
	
	/**findOrCreateUser = function(){
	      User.findOne({'username':username},function(err, user) {
	        if (err){
	          console.log('Error in SignUp: '+err);
	          return done(err);
	        }
	        if (user) {
	          console.log('User already exists');
	          return done(null, false,req.flash('signupErrorMessage','Username already exists!'));
	        } else {
	          var newUser = new User();
		      newUser.username = username;
	          newUser.password = newUser.encryptPassword(password);
	          newUser.firstname = req.body.firstname;
	          newUser.lastname = req.body.lastname;
	          newUser.save(function(err) {
	            if (err){
	              console.log('Error in Saving user: '+err);  
	              throw err;  
	            }
	            console.log('User Registration succesful');
	            req.session.username = username;
	            req.session.currentDate = new Date();
	            return done(null, newUser);
	          });
	        }
	      });
	    };
	process.nextTick(findOrCreateUser);**/
}));	


passport.use('local.signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, username, password, done){
	process.nextTick(function(){
		
		var msg_payload = { "username": username, "password": password };
		console.log("In passport Request = UserName:"+ username+" "+password);
		
		mq_client.make_request('signin_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err){
				return done(err);
			}
			if(results.code === '402'){
				return done(null, false, req.flash('signinErrorMessage','Username does not exist!'));
			}
			if(results.code === '401'){
				return done(null, false, req.flash('signinErrorMessage','Incorrect Password!'));
			}else{
				console.log("User "+results.value);
				req.session.username = username;
				req.session.lastDate = results.date;
				return done(null, results.value);
			}
			  
		});
				
		/**User.findOne({'username': username}, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false, req.flash('signinErrorMessage','Username does not exist!'));
			}
			if(!user.validPassword(password)){
				return done(null, false, req.flash('signinErrorMessage','Incorrect Password!'));
			}else{
				req.session.username = username;
				req.session.currentDate = new Date();
				return done(null, user);
			}
		});**/	
	});
}));	



