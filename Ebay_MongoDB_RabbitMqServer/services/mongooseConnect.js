var mongoose = require('mongoose');
var connPool = [];

function getConnection(){
	mongoose.Promise = global.Promise;
	var connection = mongoose.createConnection('mongodb://localhost:27017/login');
	connection.on('error', function(err){
		  if(err) {
			  throw err;
		  }
		});
	connection.once('open', function callback () {
		  console.info('Connection Successful');
	});
	return connection;
}

for(var i = 0;i<5;i++){
	var connection = getConnection();
	connPool.push(connection);
}

function exportConnection(){
	console.log("Total connections in pool before popping connection " + connPool.length);
	if(connPool.length != 0){
		var dbConn = connPool.pop();
		return dbConn;
	}
	else{
		setInterval(function(){
			exportConnection();
		},1);
	}
}

function pushBackConnection(connection){
	connPool.push(connection);
	console.log("Total connections in pool after pushing connection " + connPool.length);
}
exports.exportConnection = exportConnection;
exports.pushBackConnection = pushBackConnection;