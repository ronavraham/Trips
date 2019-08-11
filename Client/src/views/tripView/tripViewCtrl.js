import angular from 'angular';

import './tripView.less';

angular.module('trips')
	.controller('TripViewController', ($scope, $http, $routeParams) => {
		$scope.url = 'https://images.igdb.com/igdb/image/upload/t_cover_big/faqrpb5usp5leipmwgtq.jpg';

		$http.get(`http://localhost:3000/api/trips/getTripById/${$routeParams.id}`).then((res) => {
			$scope.data = res.data;
		});
	});
