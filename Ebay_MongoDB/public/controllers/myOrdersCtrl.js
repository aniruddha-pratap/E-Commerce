angular
	.module('app')
	.controller('myOrdersCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.orderItems = [];
		$scope.message="";
		$http({
			method : 'POST',
			url : '/myOrders',
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
				console.log('product is '+data.order[0].product.name);
				for(var i =0;i<data.order.length;i++){
					var orderItems = {};
					console.log(data.order[i].product);
					orderItems.serial = i+1;
					orderItems.name = data.order[i].product.name;
					orderItems.quantity = data.order[i].quantity;
					var date = data.order[i].date;
					var split = date.toString().split("T");
					orderItems.date = split[0];
					$scope.items.push(orderItems);
				}
			}
			
		});
	}]);