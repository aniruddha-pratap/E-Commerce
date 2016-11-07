angular
	.module('app')
	.controller('myPostedCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.cartItems = [];
		$scope.message="";
		$http({
			method : 'POST',
			url : '/myPosted',
			
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
					var pushedItem = [];
					console.log(data.product[i].name);
					pushedItem.name = data.product[i].name;
					pushedItem.quantity = data.product[i].quantity;
					pushedItem.price = data.product[i].price;
					var date = data.product[i].date;
					var split = date.toString().split("T");
					pushedItem.date = split[0];
					pushedItem.serial = i+1;
					$scope.items.push(pushedItem);
				}
			}
			
		});
		
	
		
	}]);