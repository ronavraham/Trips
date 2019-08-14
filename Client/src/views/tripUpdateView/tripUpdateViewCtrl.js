import angular from 'angular';

import './tripUpdateView.less';

angular.module('trips')
	.controller('TripUpdateViewController', ($scope, $http, $routeParams, AuthenticationService) => {
		$scope.regions = ['Europe', 'Asia', 'South America', 'North America', 'Middle East', 'Africa'];
		$scope.types = ['Exotic', 'City', 'Trekk'];

		var tripTypeToId = {
			"Trekk" : 3,
			"City": 2,
			"Exotic":1
		};

		$http.get(`http://localhost:3000/api/trips/getTripById/${$routeParams.id}`).then((res) => {
			$scope.data = res.data;
		});

		$scope.updateTrip = async () => {
			$scope.isRequestSent = true;
			await $http.post('http://localhost:3000/api/trips/updateTrip', {
				trip: angular.extend({},
					$scope.data,
					{ userid: AuthenticationService.globals.currentUser.userid,
					  typeId: tripTypeToId[$scope.data.selectedTripType]})
			});

			const ws = new WebSocket('ws://localhost:3001/');
			ws.onopen = (ev) => {
				ws.send('trip updated');
				ws.close();
			};

			ws.onclose = () => {
				window.location.href = `#!mytrips`;
			};
		};
	});
