angular
	.module('app')
	.controller('myBidCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.cartItems = [];
		$scope.message="";
		$http({
			method : 'GET',
			url : '/myBid',
			
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
				console.log('product is '+data.bid[0].product.name);
				for(var i =0;i<data.bid.length;i++){
					var bidItems = {};
					console.log(data.bid[i].product);
					bidItems.serial = i+1;
					bidItems.name = data.bid[i].product.name;
					bidItems.sellerInfo = data.bid[i].product.sellerInfo;
					bidItems.bidPrice = data.bid[i].bidPrice;
					var date = data.bid[i].date;
					var split = date.toString().split("T");
					bidItems.date = split[0];
					$scope.items.push(bidItems);
				}
			}
			
		});
		
	
		
	}]);