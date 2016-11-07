angular
	.module('app')
	.controller('homeCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.cartItems = [];
		$scope.message="";
		$http({
			method : 'POST',
			url : '/home',
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data);
			console.log(data.statusCode);
			
			if(data.statusCode == "200"){
				if(data.username){
					$scope.message=data.username;
					$scope.lastLogin=" Last Login: "+data.date;
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
		
		$scope.addToCart=function(id){
			console.log("id is"+id);
			$http({
				method: 'POST',
				url: '/cart',
				data: {
					'id': id
				}
			}).success(function(data){
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
			});
	};
		
	}]);