import angular from 'angular';

export default class AppCtrl {
	constructor($scope, $location, AuthenticationService) {
		this.url = 'https://github.com/ronavraham/cookit';
		var c = document.getElementById('myCanvas');
		var ctx = c.getContext('2d');
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText('Trips', 10, 30);

		$scope.logout = () => {
			AuthenticationService.ClearCredentials();
			$location.path('/login')
		}
	}
}
angular.module('trips').controller('appCtrl', AppCtrl);
