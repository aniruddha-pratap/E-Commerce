var Product = require('../models/product');
var mongoose = require('mongoose');

var products = [
               new Product({
            	   name: 'Product1',
            		description: 'New Product',
            		sellerInfo: 'Ani',
            		price: 10,
            		quantity: 1,
            		type: 'New'})         
               ];


var done =0;
for(var i =0;i<products.length;i++){
	products[i].save(function(err, result){
		done++;
	});	
}


 