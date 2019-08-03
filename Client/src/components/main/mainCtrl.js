import angular from 'angular';

export default class AppCtrl {
	constructor ($scope) {
		this.url = 'https://github.com/ronavraham/cookit';
		var c = document.getElementById('myCanvas');
		var ctx = c.getContext('2d');
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText('Trips', 10, 30);
	}
}
angular.module('trips').controller('appCtrl', AppCtrl);
