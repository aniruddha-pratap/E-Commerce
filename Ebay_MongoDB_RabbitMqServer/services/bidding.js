var Product = require('../models/product');
var Bid = require('../models/bidding');

function showBiddingItems_request(msg, callback){
	var res = {};
	console.log("In bidding product request:"+ msg.username);
	var checkPostDate = new Date();
	checkPostDate.setDate(checkPostDate.getDate()-4);
	console.log("Old Date "+ checkPostDate);
		
	Product.find({sellerInfo: {$ne: msg.username}, type: "Bid", date: {$gte: checkPostDate}}, function(err, product){
		console.log("Inside Bidding Product");
		if(err){
			throw err;
		}else{
			console.log("Products "+product);
			res.code = "200";
			res.value = product;
			callback(null, res);
		}
	});
}

function postBid_request(msg, callback){
	
	var res = {};
	console.log("In post bid request:"+ msg.username);
	Bid.findOne({product: msg.id, bidOwner: msg.username}, function(err, bid){
		if(err){
			throw err;
		}
		else{
			if(bid){
				bid.bidPrice = msg.bidAmount;
				bid.save(function(err){
					if(err){
						throw err;
					}else{
						res.code = "200";
						callback(null, res);
					}
				});
			}else{
				var newBid = new Bid();
				newBid.product = msg.id;
				newBid.bidOwner = msg.username;
				newBid.bidPrice = msg.bidAmount;
				newBid.save(function(err){
					if(err){
						throw err;
					}
					else{
						res.code = "200";
						callback(null, res);
					}
				});
			}
		}
	});
}

function retrieveBids_request(msg, callback){
	
	var res = {};
	console.log("In reteieve bids request:"+ msg.username);
	Bid.find({bidOwner: msg.username})
	.populate('product')
	.exec(function(err, bid){
		if(err){
			throw err;
		}else{
			res.code = "200";
			res.value = bid;
			console.log("Bids "+bid);
			callback(null, res);
		}
	});
}

exports.showBiddingItems_request = showBiddingItems_request;
exports.postBid_request = postBid_request;
exports.retrieveBids_request = retrieveBids_request;