import angular from 'angular';

import './mapView.less';

angular.module('trips')
	.controller('MapViewController', ($scope, $http, AuthenticationService) => {

		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: { lat: 31.483424399819263, lng: 35.122759765625005 },
			zoom: 8
		});

		$http.get(`http://localhost:3000/api/trips/getUserTrips/${AuthenticationService.globals.currentUser.userid}`).then((res) => {
			$scope.trips = res.data.map((trip) => {
				return {
					id: trip._id,
					lat: parseFloat(trip.lat),
					lng: parseFloat(trip.long)
				};
			});

			let marker;
			for (let currTrip of $scope.trips) {
				marker = new window.google.maps.Marker({
					position: {
						lat: currTrip.lat,
						lng: currTrip.lng
					},
					map
				});

				console.log(marker);
			}
		});
	});
