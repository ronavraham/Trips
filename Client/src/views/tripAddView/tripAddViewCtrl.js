import angular from 'angular';

import './tripAddView.less';

angular.module('trips')
	.controller('TripAddViewController', ($scope, $http, AuthenticationService) => {
		// $scope.tripTypes = [{ id: "FUN", name: "כיף" },
		// { id: "TRACK", name: "מסלול" },
		// { id: "LEARN", name: "למידה" }];

		// $scope.tripAreas = [{ id: "AMERICA", name: "אמריקה" },
		// { id: "ASIA", name: "אסיה" },
		// { id: "AFRICA", name: "אפריקה" },
		// { id: "AUSTRALIA", name: "אוסטרליה" },
		// { id: "EUROPE", name: "אירופה" }];

		$scope.regions = ['Europe', 'Asia', 'South America', 'North America', 'Middle East', 'Africa'];
		$scope.types = ['Exotic', 'City', 'Trekk'];

		var tripTypeToId = {
			"Trekk" : 3,
			"City": 2,
			"Exotic":1
		};

		$scope.addTrip = async () => {
			$scope.isRequestSent = true;
			await $http.post('http://localhost:3000/api/trips/addTrip', {
				trip: angular.extend({},
					$scope.data,
					{ userid: AuthenticationService.globals.currentUser.userid,
					  typeId: tripTypeToId[$scope.data.selectedTripType] })
			});

			const ws = new WebSocket('ws://localhost:3001/');
			ws.onopen = (ev) => {
				ws.send('trip added');
				ws.close();
			};

			ws.onclose = () => {
				window.location.href = `#!mytrips`;
			};
		};
	});
