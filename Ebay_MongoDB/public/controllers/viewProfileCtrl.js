angular
	.module('app')
	.controller('viewProfileCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$http({
			method : 'GET',
			url : '/profile',
		}).success(function(data){
			if(data.username){
				$scope.message=data.username;
			}else{
				$scope.message='';
			}	
				$scope.fname=data.user.firstname;
				$scope.lname=data.user.lastname;
				$scope.dob=data.user.dob;
				$scope.cnumber=data.user.contactNumber;
				$scope.address=data.user.address;
		});
	}]);