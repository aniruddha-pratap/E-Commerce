var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app');
//var should = chai.should();
chai.use(chaiHttp);
var assert = chai.assert;
var should = require('chai').should();


//Testing SignIn
var credentials = {"username":"ani21","password":"ani21"}
describe('signin', function() {
  
  it('should sign in', function(done) {
   chai.request(server)
    .post('/signin')
    .send(credentials)
    .end(function(err, res){
     console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      //res.body.should.be.a('object');
 

      done();
    });

  });



});


var credentials = {"username":"ani21"}
describe('myOrders', function() {
  
  it('should get orders', function(done) {
   chai.request(server)
    .post('/myOrders')
    .send(credentials)
    .end(function(err, res){
     console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      //res.body.should.be.a('object')
 

      done();
    });

  });



});


var credentials = {"username":"ani21"}
describe('cart', function() {
  
  it('should show cart', function(done) {
   chai.request(server)
    .get('/cart')
    .send(credentials)
    .end(function(err, res){
     console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      //res.body.should.be.a('object')
 

      done();
    });

  });



});



var credentials = {"username":"ani21"}
describe('myPosted', function() {
  
  it('should get posted', function(done) {
   chai.request(server)
    .post('/myPosted')
    .send(credentials)
    .end(function(err, res){
     console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      //res.body.should.be.a('object')
 

      done();
    });

  });



});


var credentials = {"username" : "ani21"}
describe('profile', function() {
  
  it('should profile', function(done) {
   chai.request(server)
    .get('/profile')
    .send(credentials)
    .end(function(err, res){
     console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      //res.body.should.be.a('object')
 

      done();
    });

  });



});

