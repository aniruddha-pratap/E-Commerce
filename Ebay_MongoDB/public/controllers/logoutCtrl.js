angular
	.module('app')
	.controller('logoutCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
			$http({
				method : 'POST',
				url : '/logout',
				
			}).success(function(data) {
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
				if(data.statusCode == "200"){
					$state.go("ab");
				}
				
			});
		

	}]);