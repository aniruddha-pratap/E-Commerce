angular.
	module('app', [
	'ui.router'
	])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('signup', {
				url: '/signup',
				templateUrl: 'uiviews/signup.ejs',
				controller: 'signUpCntrl' 
			})
			.state('home', {
				url: '/home',
				templateUrl: 'uiviews/home.ejs',
				controller: 'homeCtrl' 
			})
			.state('signin', {
				url: '/signin',
				templateUrl: 'uiviews/signin.ejs',
				controller: 'signinCtrl' 
			})
			.state('logout', {
				url: '/logout',
				controller: 'logoutCtrl' 
			})
			.state('cart', {
				url: '/cart',
				templateUrl: 'uiviews/cart.ejs',
				controller: 'cartCtrl',
				params: {"totalPrice": null}
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'uiviews/profile.ejs',
				controller: 'profileCtrl'
			})
			.state('viewProfile', {
				url: '/viewProfile',
				templateUrl: 'uiviews/viewProfile.ejs',
				controller: 'viewProfileCtrl'
			})
			.state('productAdvt', {
				url: '/productAdvt',
				templateUrl: 'uiviews/productAdvt.ejs',
				controller: 'productAdvtCtrl'
			})
			.state('myOrders', {
				url: '/myOrders',
				templateUrl: 'uiviews/myorders.ejs',
				controller: 'myOrdersCtrl'
			})
			.state('myPosted', {
				url: '/myPosted',
				templateUrl: 'uiviews/myposted.ejs',
				controller: 'myPostedCtrl'
			})
			.state('postBid', {
				url: '/postBid',
				templateUrl: 'uiviews/postBid.ejs',
				controller: 'postBidCtrl'
			})
			.state('myBid', {
				url: '/myBid',
				templateUrl: 'uiviews/myBid.ejs',
				controller: 'myBidCtrl'
			})
			.state('checkout', {
				url: '/checkout',
				templateUrl: 'uiviews/checkout.ejs',
				controller: 'checkoutCtrl'
			});
	}]);