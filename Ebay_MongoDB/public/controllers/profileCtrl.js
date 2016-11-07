angular
	.module('app')
	.controller('profileCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$http({
			method : 'get',
			url : '/profile',
		}).success(function(data) {
			//checking the response data for statusCode
			if(data.username){
				$scope.message=data.username;
			}else{
				$scope.message='';
			}	
		});
		$scope.submit = function(fname,lname,dob,cnumber,address){
			if(fname === undefined){
				fname = '';
			}
			if(lname === undefined){
				lname = ''; 
			} 
			if(dob === undefined){
				dob = ''; 
			} 
			if(cnumber === undefined){
				cnumber = '';
			} 
			if(address === undefined){
				address = ''; 
			}
			$http({
				method : 'POST',
				url : '/profile',
				data: {
					'firstname': fname,
					'lastname' : lname,
					'dob': dob,
					'phoneNumber' : cnumber,
					'address': address
				}
			}).success(function(data) {
				//checking the response data for statusCode
				console.log(data.statusCode);
				$scope.message = data.error;
			});
		};

	}]);