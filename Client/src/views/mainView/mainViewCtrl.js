import angular from 'angular';

export default class mainViewCtrl {
	constructor ($scope, $route, $routeParams, $location, $http) {
		this.url = 'https://images.igdb.com/igdb/image/upload/t_cover_big/faqrpb5usp5leipmwgtq.jpg';
		$scope.videoUrl = 'Hello from TRIPS';
	}
}

angular.module('trips').controller('mainViewCtrl', mainViewCtrl);
