var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var conn = require('../services/mongooseConnect');

var tempConn = conn.exportConnection();
conn.pushBackConnection(tempConn);

var userSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	dob: {type: String},
	contactNumber: {type: Number},
	address: {type: String},
	date: {type: String}
});

userSchema.methods.encryptPassword=function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword=function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = tempConn.model('User', userSchema);