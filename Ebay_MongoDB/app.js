var express = require('express');
var http = require('http');
var path = require('path');
var amqp = require('amqp');
var favicon = require('serve-favicon');
var winston = require('winston');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var validate = require('express-validator');
var MongoStore = require('connect-mongo')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var home = require('./routes/home');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var cart = require('./routes/cart');
var cartRemove = require('./routes/cartRemove');
var checkout = require('./routes/checkout');
var myOrders = require('./routes/myOrders');
var profile = require('./routes/profile');
var productAdvt = require('./routes/productAdvt');
var myPosted = require('./routes/myPosted');
//var postBidProduct = require('./routes/postBidProduct');
var postBid = require('./routes/postBid');
var myBid = require('./routes/myBid');


var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/login');
require('./routes/passport');


// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
winston.add( winston.transports.File, 
		{
		    filename: './alllogs.log',
		    level: 'debug',
		    json: true,
		    eol: 'rn', 
		    timestamp: true
		  }
		);
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'mysecret',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	cookie: {maxAge: 180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/signin', signin);
app.use('/home', home);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/cart', cart);
app.use('/cartRemove', cartRemove);
app.use('/checkout', checkout);
app.use('/myOrders', myOrders);
app.use('/profile', profile);
app.use('/productAdvt', productAdvt);
app.use('/myPosted', myPosted);
//app.use('/postBidProduct', postBidProduct);
app.use('/postBid', postBid);
app.use('/myBid', myBid);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function(){
	 console.log('App listening port' + app.get('port'));
});

module.exports = app;
