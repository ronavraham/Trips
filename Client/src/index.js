import angular from 'angular';
import $ from 'jquery';
import mainComp from './components/main/mainComp';

const MODULE_NAME = 'trips';
angular.module(MODULE_NAME, [require('angular-route'), require('angular-material'), require('angular-cookies')]).run(run);
mainComp();

require('angular-material/angular-material.min.css');

require('./services/user.service');
require('./services/authentication.service');
require('./services/trip.service');

require('./views/main/main.controller');
require('./views/login/login.controller');
require('./views/register/register.controller');

angular.module(MODULE_NAME).config(($routeProvider) => {
	$routeProvider.when('/', {
		template: require('./views/main/main.view.html'),
		controller: 'MainController'
	}).when('/login', {
		template: require('./views/login/login.view.html'),
		controller: 'LoginController'
	}).when('/register', {
		template: require('./views/register/register.view.html'),
		controller: 'RegisterController'
	});
});

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
	// keep user logged in after page refresh
	$rootScope.globals = $cookies.getObject('globals') || {};
	if ($rootScope.globals.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
	}

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		// redirect to login page if not logged in and trying to access a restricted page
		var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
		var loggedIn = $rootScope.globals.currentUser;
		if (restrictedPage && !loggedIn) {
			$location.path('/login');
		}
	});
}
