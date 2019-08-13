import angular from 'angular';

import './tripView.less';

angular.module('trips')
	.controller('TripViewController', ($scope, $http, $routeParams, UserService) => {
		$scope.url = 'https://images.igdb.com/igdb/image/upload/t_cover_big/faqrpb5usp5leipmwgtq.jpg';
		$scope.dataLoading = true;

		$http.get(`http://localhost:3000/api/trips/getTripById/${$routeParams.id}`).then((res) => {
			$scope.tempData = res.data;
			$scope.dataLoading = false;

			if (res.data.userid) {
				UserService.GetById(res.data.userid).then(this.callbackHandler);
			}
			else if (res.data.email) {
				UserService.GetByEmail(res.data.email).then(this.callbackHandler);	
			}
		});

		this.callbackHandler = (res) => {
			$scope.tempData.author = res.username;
			$scope.data = $scope.tempData;
		}
	});
