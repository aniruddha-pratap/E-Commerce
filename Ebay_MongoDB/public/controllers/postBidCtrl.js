angular
	.module('app')
	.controller('postBidCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.message="";
		$http({
			method : 'GET',
			url : '/postBid',
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data);
			console.log(data.statusCode);
			if(data.statusCode == "200"){
				if(data.username){
					$scope.message=data.username;
				}else{
					$scope.message='';
				}	
				
				for(var i =0;i<data.product.length;i++){
					var pushedItem = {};
					console.log(data.product[i].name);
					pushedItem.name = data.product[i].name;
					pushedItem.description = data.product[i].description;
					pushedItem.price = data.product[i].price;
					pushedItem.quantity = data.product[i].quantity;
					pushedItem.sellerInfo = data.product[i].sellerInfo;
					pushedItem.id = data.product[i]._id;
					$scope.items.push(pushedItem);
				}
			}
		});
		
		$scope.placeBid=function(id,bidAmount){
			if(bidAmount === undefined){
				bidAmount = '0';
			}
			console.log("Amount is"+bidAmount);
			$scope.error = "";
			$http({
				method: 'POST',
				url: '/postBid',
				data: {
					'id': id,
					'bidAmount': bidAmount
				}
			}).success(function(data){
				//checking the response data for statusCode
				console.log(data.statusCode);
				console.log(data.error);
				$scope.error = data.error;
			});
		};
		
	}]);