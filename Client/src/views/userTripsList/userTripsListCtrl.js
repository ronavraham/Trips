import angular from 'angular';

import './userTripsListStyle.less';

angular.module('trips')
	.controller('UserTripsListController', ($scope, $http, AuthenticationService) => {
		$scope.url = 'https://images.igdb.com/igdb/image/upload/t_cover_big/faqrpb5usp5leipmwgtq.jpg';

		$http.get(`http://localhost:3000/api/trips/getUserTrips/${AuthenticationService.globals.currentUser.userid}`).then((res) => {
			$scope.trips = res.data;
		});

		$scope.ws = new WebSocket('ws://localhost:3001/');

		$scope.ws.onopen = () => {
			console.log('ws connected');
		};

		$scope.ws.onmessage = async (msg) => {
			var res = await $http.get(`http://localhost:3000/api/trips/getUserTrips/${AuthenticationService.globals.currentUser.userid}`);
			$scope.trips = res.data;
		};

		$scope.ws.onclose = () => {
			console.log('ws closed');
		};

		$scope.updateTrip = (id) => {
			window.location.href = `#!tripUpdate?id=${id}`;
			$scope.ws.close();
		};

		$scope.addTrip = () => {
			window.location.href = `#!tripAdd`;
			$scope.ws.close();
		};

		$scope.deleteTrip = async (id) => {
			await $http.post('http://localhost:3000/api/trips/deleteTrip', { tripId: id });
			$scope.ws.send('trip deleted');
			var res = await $http.get(`http://localhost:3000/api/trips/getUserTrips/${AuthenticationService.globals.currentUser.userid}`);
			$scope.trips = res.data;
			$scope.$applyAsync();
		};

		$scope.openTripView = (id) => {
			window.location.href = `#!tripView?id=${id}`;
		};
	});
