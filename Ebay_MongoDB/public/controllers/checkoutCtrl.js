angular
	.module('app')
	.controller('checkoutCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
		$scope.makePayment = function(cardNumber, expiration, cardCVV){
			console.log('number: '+cardNumber+'epxiratn: '+expiration+'cvv: '+cardCVV);
			if(cardNumber === undefined && expiration === undefined && cardCVV === undefined){
				$scope.message = 'Please provide all the details';
			}else{
				$http({
					method:"POST",
					url: "/checkout",
					data:{
						'cardNumber': cardNumber,
					}
				}).success(function(data){
					console.log(data);
					if(data.statusCode == '200'){
						$scope.message = "Checkout Complete";
					}else{
						$scope.message = data.error;
					}
					
				});
			}
		};
	}]);