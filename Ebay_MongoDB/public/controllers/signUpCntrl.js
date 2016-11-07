angular
	.module('app')
	.controller('signUpCntrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.signup = function(fname,lname,uname,pass){
			$http({
				method : 'POST',
				url : '/signup',
				data: {
					'firstname': fname,
					'lastname' : lname,
					'username' : uname,
					'password' : pass
				}
			}).success(function(data) {
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
				if(data.statusCode == "200"){
					$state.go("home");
				}
				else{
					$scope.errorMessage = data.error[0];
				}
			});
		};

	}]);