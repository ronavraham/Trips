import angular from 'angular';

angular.module('trips').controller('MainController', ($scope, $http, TripService) => {

	// This function runs itself on init of the controller
	(this.getAllTrips = async () => {
		$scope.dataLoading = true;
		$scope.trips = [];

		try {
			var x = await TripService.GetAll();

			if (x.length) {
				$scope.trips = x;
			}
		}
		catch (error) {
			console.error(error);
		}
		finally {
			$scope.dataLoading = false;
			$scope.$applyAsync();
		}
	})();

	$scope.gotoTrip = (id) => {
		window.location.href = `#!tripView?id=${id}`;
	}

	var getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getWeather)
		}
	}

	var getWeather = async (position) => {
		var res = await $http.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather',
			{
				params: {
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					units: 'metric',
					APPID: '50e5e552a74c7defcc7607a0fce0fdf6'
				}
			});
		$scope.temp = res.data.main.temp
	}

	getLocation();
});
