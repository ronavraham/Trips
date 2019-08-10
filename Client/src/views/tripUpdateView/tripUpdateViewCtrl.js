import angular from 'angular';

import './tripUpdateView.less';

angular.module('trips')
	.controller('TripUpdateViewController', ($scope, $http, $routeParams, AuthenticationService) => {
		$scope.tripTypes = [{ id: "FUN", name: "כיף" },
		{ id: "TRACK", name: "מסלול" },
		{ id: "LEARN", name: "למידה" }];

		$scope.tripAreas = [{ id: "AMERICA", name: "אמריקה" },
		{ id: "ASIA", name: "אסיה" },
		{ id: "AFRICA", name: "אפריקה" },
		{ id: "AUSTRALIA", name: "אוסטרליה" },
			{ id: "EUROPE", name: "אירופה" }];

		$http.get(`http://localhost:3000/api/trips/getTripById/${$routeParams.id}`).then((res) => {
			$scope.data = res.data;
		});

		$scope.updateTrip = async () => {
			$scope.isRequestSent = true;
			await $http.post('http://localhost:3000/api/trips/updateTrip', {
				trip: angular.extend({},
					$scope.data,
					{ userid: AuthenticationService.globals.currentUser.userid })
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
