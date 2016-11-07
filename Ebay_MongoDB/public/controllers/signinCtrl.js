angular
	.module('app')
	.controller('signinCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.signin = function(username, password){
			console.log('Username '+username+' Password '+password);
			$http({
				method : 'POST',
				url : '/signin',
				data: {
					'username' : username,
					'password' : password
				}
			}).success(function(data) {
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
				console.log(data.error);
				if(data.statusCode == "200"){
					$state.go("home");
				}else{if(data.statusCode == "401"){
					alert(data.error);
				}
				else{
					$scope.errorMessage = data.error[0];
				}}
			});
		};

	}]);